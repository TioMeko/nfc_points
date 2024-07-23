declare module 'nfc-pcsc' {
  import { EventEmitter } from 'events';

  export class NFC extends EventEmitter {
    constructor();
  }

  export class Reader extends EventEmitter {
    name: string;
    a: any;
    constructor(nfc: NFC);
    connect(type: any): Promise<any>;
    disconnect(): Promise<any>;
    transmit(data: any, responseMaxLength: any): Promise<any>;
    control(data: any, responseMaxLength: any): Promise<any>;
    close(): Promise<any>;
  }

  export interface Card {
    uid: string;
  }
}
