// @flow

import EventEmitter from 'events';

export default class Router extends EventEmitter {
  address: string

  // Just an example, this would probably move to streams. Or not.
  send(address: string, packet: Object) {
    throw new Error(`Not implemented (sending ${typeof packet} to ${address})`);
  }
}
