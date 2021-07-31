"use strict";
const Cookie = (ingoingMessage) => {
    const rawCookies = ingoingMessage.headers.cookie.split('; ');
    rawCookies.forEach((cookie) => {
        const [key, value] = cookie.split('=');
        ingoingMessage.cookies[key] = value;
    });
};
module.exports = Cookie;
//# sourceMappingURL=cookie.js.map