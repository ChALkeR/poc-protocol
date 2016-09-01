// @flow

import Device from './Device';
import Message from './Message';

export default class Person {
  name: string
  devices: Array<Device>

  sendMessage(message: Message) {
    throw new Error(`TODO: sending ${typeof message}`);
  }
}
