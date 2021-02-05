export interface HttpInvokeHeaders {
  [key: string]: string;
}

export interface HttpInvokeQuery {
  [key: string]: string;
}

export interface HttpInvokeParams {
  method: string;
  url: string;
  path: string;
  body?: any;
  headers?: HttpInvokeHeaders;
  query?: HttpInvokeQuery;
  responseType?: any;
  ContentType?: string;
}
