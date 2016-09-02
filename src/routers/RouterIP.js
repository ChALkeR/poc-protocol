// @flow

import os from 'os';
import net from 'net';
import sodium from 'sodium';
import Router from '../Router';

export default class RouterIP extends Router {
  ip: string
  box: sodium.Box
  port: number
  server: net.Server

  constructor(box: sodium.Box, ip: string, port: ?number) {
    super();
    this.box = box;
    this.port = port || 12235;
    this.ip = ip || RouterIP.ipList()[0].address;
    const pubkey = box.boxKey.publicKey.toString('hex');
    this.address = `${this.ip}|${this.port}|${pubkey}`;
    this.server = net.createServer();
    this.server.listen(this.port, this.ip);
    this.server.on('connection', (socket: net.Socket) => {
      this.emit('connection', this.wrapSocket(socket));
    });
    this.server.on('listening', () => {
      this.emit('listening');
    });
  }
  static ipList(): Array<Object> {
    const ips = [];
    const ifaces = os.networkInterfaces();
    for (const ifname in ifaces) {
      for (const iface of ifaces[ifname]) {
        if (iface.internal) continue;
        ips.push(iface);
      }
    }
    return ips;
  }
  wrapSocket(socket: net.Socket): EventEmitter {
    const ee = new EventEmitter();
    socket.on('data', (buf: Buffer) => {
      // TODO: decode here
      ee.emit('data', buf);
    });
    return ee;
  }
}
