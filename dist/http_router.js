"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
function router() {
    this.functions = [];
    function settings(_this, path, fns, method) {
        _this.functions.push({ method, path, fns });
        return _this;
    }
    this.get = function (path, ...fns) { return settings(this, path, fns, 'GET'); };
    this.push = function (path, ...fns) { return settings(this, path, fns, 'PUSH'); };
    this.update = function (path, ...fns) { return settings(this, path, fns, 'UPDATE'); };
    this.patch = function (path, ...fns) { return settings(this, path, fns, 'PATCH'); };
    this.delete = function (path, ...fns) { return settings(this, path, fns, 'DELETE'); };
    this.all = function (path, ...fns) { return settings(this, path, fns, '*'); };
    return this;
}
exports.router = router;
router.prototype.callFunctions = function callFunctions(req, res) {
    let next = false;
    this.functions.every((fnObject) => {
        const { method, url } = req;
        if (!fnObject.method || !fnObject.path || !fnObject.fns)
            throw 'Invalid router.';
        if ((fnObject.method === method || fnObject.method === '*') && fnObject.path === url)
            fnObject.fns.every((fn) => {
                fn(req, res, () => next = true);
                if (this.wasSent)
                    next = false;
                return next;
            });
        return next;
    });
};
//# sourceMappingURL=http_router.js.map