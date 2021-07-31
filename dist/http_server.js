"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const net_1 = __importDefault(require("net"));
const http_events_1 = require("./http_events");
function Server(routers) {
    if (!(this instanceof Server))
        return new Server(this, routers);
    if (!routers?.length)
        throw new Error('Define RequestListener');
    this.netServer = net_1.default.createServer((socket) => new http_events_1.InitEvents(socket).data(routers));
}
exports.Server = Server;
Server.prototype.listen = function listen(...args) { this.netServer.listen(...args); };
//# sourceMappingURL=http_server.js.map