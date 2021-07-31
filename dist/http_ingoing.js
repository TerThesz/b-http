"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngoingMessage = void 0;
const utils_1 = require("./utils");
const path_1 = require("path");
const glob_1 = require("glob");
const kHeaders = Symbol('kHeaders');
const kQuery = Symbol('kQuery');
const kCookies = Symbol('kCookies');
function IngoingMessage(socket, buffer) {
    this.socket = socket;
    this[kHeaders] = {};
    this.rawHeaders = [];
    this.ip = socket.remoteAddress;
    this[kCookies] = {};
    this.protocol = null;
    this.method = null;
    this.url = null;
    this[kQuery] = {};
    this.body = null;
    const requestString = buffer.toString();
    const [firstLine, rest] = (0, utils_1.divideString)(requestString, '\r\n');
    const [method, urlAndQuery, protocol] = firstLine.split(' ', 3);
    const [headers, body] = (0, utils_1.divideString)(rest, '\r\n\r\n');
    this.method = method;
    this.protocol = protocol;
    const [url, rawQuery] = urlAndQuery.split('?');
    this.url = url;
    if (rawQuery) {
        const query = rawQuery.split('&');
        query.forEach((parameter) => {
            const [key, value] = parameter.split('=');
            this[kQuery][key] = value;
        });
    }
    const files = (0, glob_1.sync)((0, path_1.resolve)('./src/headers/**/*.ts'));
    headers.split('\r\n').forEach((header) => {
        const [key, value] = header.split(': ');
        this[kHeaders][key.toLocaleLowerCase()] = value;
        this.rawHeaders.push(header);
        const file = files.find((file) => file.split('/').slice(-1)[0].replace('.ts', '') === key.toLowerCase());
        if (file)
            (require(file))(this);
    });
    this.body = body;
}
exports.IngoingMessage = IngoingMessage;
Object.defineProperty(IngoingMessage.prototype, 'headers', {
    get: function () {
        return this[kHeaders];
    },
    set: function (val) {
        this[kHeaders] = val;
    }
});
Object.defineProperty(IngoingMessage.prototype, 'cookies', {
    get: function () {
        return this[kCookies];
    },
    set: function (val) {
        this[kCookies] = val;
    }
});
Object.defineProperty(IngoingMessage.prototype, 'query', {
    get: function () {
        return this[kQuery];
    },
    set: function (val) {
        this[kCookies] = val;
    }
});
//# sourceMappingURL=http_ingoing.js.map