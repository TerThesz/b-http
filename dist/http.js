"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.createServer = void 0;
const http_server_1 = require("./http_server");
const http_router_1 = require("./http_router");
function createServer(...requestListeners) {
    return new http_server_1.Server(requestListeners);
}
exports.createServer = createServer;
const Router = http_router_1.router;
exports.Router = Router;
//# sourceMappingURL=http.js.map