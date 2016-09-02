// @flow

import sodium from 'sodium';
import RouterIP from './RouterIP';

export default class RouterCJDNS extends RouterIP {
  ip: string
  constructor(box: sodium.Box, port: ?number) {
    const ip6 = RouterIP.ipList()
      .filter((entry: Object): boolean =>
        entry.family === 'IPv6' &&
        entry.netmask === 'ff00::' &&
        entry.address.substr(0, 2) === 'fc'
      )
      .pop();
    super(box, ip6.address, port);
  }
}
