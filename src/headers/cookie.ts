function Cookie(ingoingMessage: any) {
  const rawCookies = ingoingMessage.headers.cookie.split('; ');

  rawCookies.forEach((cookie: string) => {
    const [ key, value ] = cookie.split('=');
    console.log({cookie, key, value, prd: ingoingMessage.__proto__, kak: ingoingMessage.cookies})
    ingoingMessage.cookies[key] = value;
  });
}

export = Cookie;