import axios from 'axios';

import { camelize, decamelize } from './keysConverter';

export default {
  authenticityToken() {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.content : null;
  },

  headers() {
    return {
      Accept: '*/*',
      'content-Type': 'application/json',
      'X-CSRF-Token': this.authenticityToken(),
      'X-Requested-With': 'XMLHttpRequest',
    };
  },

  get(url, params = {}) {
    const body = decamelize(params);
    return axios.get(url, { ...body, headers: this.headers() }).then(camelize);
  },

  post(url, json) {
    const body = decamelize(json);
    return axios.post(url, body, { headers: this.headers() }).then(camelize);
  },

  put(url, json) {
    const body = decamelize(json);
    return axios.put(url, body, { headers: this.headers() }).then(camelize);
  },

  delete(url) {
    return axios.delete(url, { headers: this.headers() }).then(camelize);
  },
};
