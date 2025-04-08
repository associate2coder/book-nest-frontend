import { API_BASE_URL } from "../config/constants";

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// wait function to test loaders
// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { 
    method,
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(API_BASE_URL + url, options)
    .then(response => {     
      // console.log(response);

      if (response.status === 401 || response.status === 403) {
        throw new Error('unauthorised');
      }

      const contentType = response.headers.get('Content-Type') || '';
      const contentLength = response.headers.get('Content-Length');

      const hasBody =
        response.status !== 204 &&
        contentType.includes('application/json') &&
        (contentLength === null || parseInt(contentLength) > 0);

      if (contentType.includes('text')) {
        return response.text();
      }

      if (!hasBody) {
        return response.ok;
      }

      return hasBody ? response.json() : null;
    });
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data?: unknown) => request<T>(url, 'POST', data),
  delete: (url: string) => request(url, 'DELETE'),
};
