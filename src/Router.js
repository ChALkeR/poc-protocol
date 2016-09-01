// @flow

export default class Router {
  address: string
  fingerprint: Buffer
  id: string

  // Just an example, this would probably move to streams. Or not.
  send(address: string, packet: Object) {
    throw new Error(`Not implemented (sending ${typeof packet} to ${address})`);
  }
  buildId() {
    if (this.id) return;
    this.id = `${this.address}:${this.fingerprint.toString('hex')}`;
  }
}
