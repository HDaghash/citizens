import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInvokeParams } from './types';
@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * Invoke function should be able to handle any HTTP request based on the @params
   */
  invoke(params: HttpInvokeParams): Observable<any> {
    if (params) {
      const method = params.method.toLowerCase();
      const {
        url,
        path,
        body,
        headers,
        query,
        responseType,
        ContentType
      } = params;

      const requestURL = `${url}/${path}`;

      let request;
      let requestParams = new HttpParams();
      let requestHeaders = new HttpHeaders();

      /**
       * DEFAULT HEADERS
       */
      requestHeaders = requestHeaders.set(
        'Content-Type',
        ContentType || 'application/json'
      );

      /**
       * CUSTOM HEADERS
       */
      if (headers) {
        for (const key in headers) {
          if (headers.hasOwnProperty(key)) {
            requestHeaders = requestHeaders.append(key, headers[key]);
          }
        }
      }

      /**
       * CUSTOM REQUEST QUERY (?key=value)
       */
      if (query) {
        for (const key in query) {
          if (query.hasOwnProperty(key)) {
            requestParams = requestParams.append(key, query[key]);
          }
        }
      }

      const type = responseType || 'json';

      const requestOptions = {
        headers: requestHeaders,
        params: requestParams,
        responseType: type
      };

      /**
       * body handling
       */

      const payLoad = JSON.stringify(body);

      /**
       * HANDLE GET, POST etc. REQUESTS
       */
      if (method === 'get') {
        request = this.http[method](requestURL, requestOptions);
      } else if (method === 'post' || method === 'put' || method === 'patch') {
        request = this.http[method](requestURL, payLoad, requestOptions);
      } else if (method === 'delete') {
        request = this.http.request(method, requestURL, {
          ...requestOptions,
          body: payLoad
        });
      } else {
        console.error('Unknown request method.');
      }

      /**
       * RETURN API REQUEST
       */
      return request;
    }
  }
}
