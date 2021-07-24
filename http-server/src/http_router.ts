function router(this: any) {
  this.functions = [];

  this.get = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'GET', path, fns }); };
  this.post = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'POST', path, fns }); };
  this.put = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'PUT', path, fns }); };
  this.delete = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'DELETE', path, fns });};
  this.patch = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'PATCH', path, fns }); };
  this.update = function(this: any, path: string, ...fns: Function[]) { this.functions.push({ method: 'UPDATE', path, fns }); };
}

router.prototype.callFunctions = function (this: any, req: any, res: any) {
  let next = false;

  this.functions.every((fnObject: { [key: string]: any }) => {
    const { method, url } = req;

    if (!fnObject.method || !fnObject.url || fnObject.fns) throw 'Invalid router.';
    
    if (fnObject.method === method && fnObject.url === url) 
    fnObject.fns.every((fn: Function) => {
      fn(req, res, () => next = true);
      return next;
    });

    return next;
  });
}

export { router };