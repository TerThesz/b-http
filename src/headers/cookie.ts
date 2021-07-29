const Cookie = (ingoingMessage: any) => {
  const rawCookies = ingoingMessage.headers.cookie.split('; ');

  rawCookies.forEach((cookie: string) => {
    const [ key, value ] = cookie.split('=');
    console.log({key, value})
    ingoingMessage.cookies[key] = value;
  });
};

export = Cookie;