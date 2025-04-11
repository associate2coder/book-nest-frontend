import { API_BASE_URL } from "../config/constants";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';


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
    // check if data exists and contains image
    const isImageUpload = typeof data === 'object' &&
      data !== null &&
      'image' in data &&
      data.image instanceof File;

    if (isImageUpload) {
      // if data has image, send form with image
      const formData = new FormData();
      formData.append('image', (data as { image: File }).image);

      options.body = formData;
    } else {
      // if data has no image, send json
      options.body = JSON.stringify(data);
      options.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      };  
    }
  }

  return fetch(API_BASE_URL + url, options)
    .then(response => {
      // console.log(response);

      // if request is not authorised, throw an error and catch it later
      if (response.status === 401 || response.status === 403) {
        throw new Error('unauthorised');
      }

      // check if response has body
      const contentType = response.headers.get('Content-Type') || '';
      const contentLength = response.headers.get('Content-Length');
      const hasBody =
        response.status !== 204 &&
        contentType.includes('application/json') &&
        (contentLength === null || parseInt(contentLength) > 0);

      // if response does not have body
      // return whether it was successful
      if (!hasBody) {
        return response.ok;
      }

      // if response has text, return this text
      if (contentType.includes('text')) {
        return response.text();
      }

      // otherwise, return json
      return response.json();
    });
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data?: unknown) => request<T>(url, 'POST', data),
  put: <T>(url: string, data?: unknown) => request<T>(url, 'PUT', data),
  delete: (url: string) => request(url, 'DELETE'),
};
