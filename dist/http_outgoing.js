"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingMessage = void 0;
const utils_1 = require("./utils");
const kHeaders = Symbol('kHeaders');
const kCookies = Symbol('kCookies');
function OutgoingMessage(socket) {
    this.socket = socket;
    this.protocol = 'HTTP/1.1';
    this.statusCode = null;
    this.statusMessage = null;
    this[kHeaders] = {};
    this[kCookies] = [];
    this.body = null;
    this.server = 'The greatest http server in the world.';
    this.lastModified = new Date();
    this.canBeSent = false;
    this.wasSent = false;
}
exports.OutgoingMessage = OutgoingMessage;
Object.defineProperty(OutgoingMessage.prototype, 'headers', {
    get: function () {
        return this[kHeaders];
    },
    set: function (val) {
        this[kHeaders] = val;
    }
});
Object.defineProperty(OutgoingMessage.prototype, 'cookies', {
    get: function () {
        return this[kCookies];
    }
});
OutgoingMessage.prototype.status = function status(code) {
    if (this.wasSent)
        throw 'Cannot change response after it was already send.';
    const statusCode = STATUS_CODES[code];
    if (!statusCode)
        throw 'Invalid Code.';
    this.statusCode = code;
    this.statusMessage = statusCode;
    this.canBeSent = true;
    return this;
};
OutgoingMessage.prototype.write = function write(message) {
    if (typeof message != 'string')
        message = message.toString();
    if (!this.statusCode)
        this.status(200);
    this.headers['Content-Type'] = 'text';
    this.headers['Content-Length'] = message.length;
    this.body = message;
    return this;
};
OutgoingMessage.prototype.json = function json(message) {
    if (!this.statusCode)
        this.status(200);
    if (typeof message != 'object')
        throw 'invalid JSON.';
    this.headers['Content-Type'] = 'application/json';
    this.headers['Content-Length'] = JSON.stringify(message).length;
    this.body = JSON.stringify(message);
    return this;
};
OutgoingMessage.prototype.setCookie = function setCookie(key, value, settings = {}) {
    (0, utils_1.verifyCookie)(settings);
    this[kCookies].push({
        name: key,
        value,
        settings
    });
};
const STATUS_CODES = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a Teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended',
    511: 'Network Authentication Required'
};
//# sourceMappingURL=http_outgoing.js.map