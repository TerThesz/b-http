"use strict";
function verifyCookie(settings) {
    Object.keys(settings).forEach((key) => {
        const value = settings[key];
        switch (key) {
            case 'Expires':
                if (value instanceof Date)
                    delete settings[key];
                break;
            case 'Max-Age':
                if (typeof value !== 'number')
                    delete settings[key];
                break;
            case 'Domain':
                if (typeof value !== 'string' || !value.includes('.'))
                    delete settings[key];
                break;
            case 'Path':
                if (typeof value !== 'string' || value.includes('/'))
                    delete settings[key];
                break;
            case 'Secure':
                if (typeof value !== 'boolean' || value === false)
                    delete settings[key];
                break;
            case 'HttpOnly':
                if (typeof value !== 'boolean' || value === false)
                    delete settings[key];
                break;
            case 'SameSite':
                if (!['Strict', 'Lax', 'None'].includes(value))
                    delete settings[key];
                break;
            default: return delete settings[key];
        }
    });
}
module.exports = verifyCookie;
//# sourceMappingURL=verify_cookie.js.map