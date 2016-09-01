// @flow

import StateChange from './StateChange';

export default class Device {
  address: string
  fingerprint: Buffer
  id: string
  states: Array<StateChange>

  buildId() {
    if (this.id) return;
    this.id = `${this.address}:${this.fingerprint.toString('hex')}`;
  }
}
