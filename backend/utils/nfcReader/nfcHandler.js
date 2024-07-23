import { NFC } from 'nfc-pcsc';
import User from '../../api/models/User.js';
import dateFormat from '../helper/dateFormat.js';

const nfc = new NFC();

nfc.on('reader', reader => {
  console.log(`${dateFormat()} Reader detected: ${reader.name}`);

  reader.on('card', async card => {
    const uid = card.uid;
    console.log(`Card detected: ${uid}`);

    try {
      console.log(`Looking for user with card UID: ${uid}`);
      let user = await User.findOne({ 'cards.uid': uid });

      if (user) {
        console.log(`User found: ${user.username}`);
        const card = user.cards.find(c => c.uid === uid);
        const lastScanned = card.lastScanned;
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const lastScannedDay = lastScanned ? lastScanned.toISOString().split('T')[0] : null;

        if (lastScannedDay === today) {
          console.log(`Card UID: ${uid} has already been scanned today. No points added.`);
        } else {
          user.points += 1;
          card.lastScanned = now;
          await user.save();
          console.log(`Points updated and lastScanned set for UID: ${uid}`);
        }
      } else {
        console.log(`No user associated with UID: ${uid}`);
      }
    } catch (err) {
      console.error(`Error updating points for UID: ${uid}`, err);
    }
  });

  reader.on('error', err => {
    console.error(`Error with reader: ${reader.name}`, err);
  });

  reader.on('end', () => {
    console.log(`Reader disconnected: ${reader.name}`);
  });
});

nfc.on('error', err => {
  console.error('Error with NFC reader:', err);
});

export default nfc;
