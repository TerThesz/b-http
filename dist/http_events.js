"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitEvents = void 0;
const http_ingoing_1 = require("./http_ingoing");
const http_outgoing_1 = require("./http_outgoing");
function InitEvents(socket) {
    if (!socket)
        throw 'Give socket >:(';
    this.socket = socket;
    this.closedConnection = false;
}
exports.InitEvents = InitEvents;
InitEvents.prototype.data = function data(routers) {
    this.socket.on('data', (buffer) => {
        const req = new http_ingoing_1.IngoingMessage(this.socket, buffer);
        const res = new http_outgoing_1.OutgoingMessage(this.socket, buffer);
        routers.forEach((router) => router.callFunctions(req, res));
        const endLine = '\r\n';
        let response = `${res.protocol} ${res.statusCode} ${res.statusMessage}` + endLine +
            `Date: ${new Date()}` + endLine +
            `Server: ${res.server}` + endLine +
            `Last-Modified: ${res.lastModified}`;
        if (res.headers != {}) {
            response += endLine;
            const names = Object.keys(res.headers);
            names.forEach((name, index) => {
                response += name + ': ' + res.headers[name] + endLine;
            });
        }
        if (res.cookies.length) {
            res.cookies.forEach((cookie) => {
                response += `Set-Cookie: ${cookie.name}=${cookie.value}`;
                Object.keys(cookie.settings).forEach((setting) => {
                    response += `; ${setting}${cookie.settings[setting] !== null ? '=' + cookie.settings[setting] : null}`;
                });
                response += endLine;
            });
        }
        if (res.body != null)
            response += endLine + res.body;
        if (this.closedConnection === true)
            return;
        if (res.canBeSent === true) {
            res.wasSent = true;
            this.socket.end(response);
        }
    });
    this.socket.on('error', () => this.closedConnection = true);
    this.socket.on('disconnect', () => this.closedConnection = true);
};
//# sourceMappingURL=http_events.js.map