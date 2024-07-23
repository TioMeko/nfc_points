import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  lastScanned: {
    type: Date,
    default: null,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  cards: [cardSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
