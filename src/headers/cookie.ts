const Cookie = (ingoingMessage: any) => new Promise((resolve, reject) => {
  const rawCookies = ingoingMessage.headers.cookie.split('; ');

  rawCookies.forEach((cookie: string) => {
    const [ key, value ] = cookie.split('=');
    console.log({cookie, key, value, prd: ingoingMessage.__proto__, kak: ingoingMessage.cookies})
    ingoingMessage.cookies[key] = value;
  });

  resolve(null);

  // HERE FINISH THIS
});

export = Cookie;