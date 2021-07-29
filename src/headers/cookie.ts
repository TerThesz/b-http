const Cookie = (ingoingMessage: any) => {
  const rawCookies = ingoingMessage.headers.cookie.split('; ');

  rawCookies.forEach((cookie: string) => {
    const [ key, value ] = cookie.split('=');
    ingoingMessage.cookies[key] = value;
  });
};

export = Cookie;