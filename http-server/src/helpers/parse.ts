import { Request } from '../types';
import { divideString } from '../utils';

const Parse = {
  request: (requestString: string): Request => {
    const [ firstLine, rest ] = divideString(requestString, '\r\n');

    const [ method, url, protocol ] = firstLine.split(' ', 3);
    const [ headers, body ] = divideString(rest, '\r\n\r\n');
  
    const parsedHeaders = {} as { [key: string]: string }; 
    headers.split('\r\n').forEach((header) => {
      const [ key, value ] = header.split(': ');
      parsedHeaders[key] = value;
    });
  
    return { protocol, method, url, headers: parsedHeaders, body };
  },

  response: () => {

  }
}

export default Parse;