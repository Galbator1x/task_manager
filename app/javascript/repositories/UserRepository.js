import Routes from 'Routes';
import Fetch from 'utils/Fetch';
import { decamelize } from 'utils/keysConverter';

export default {
  getUsers(params) {
    const path = Routes.apiV1UsersPath(decamelize(params));

    return Fetch.get(path);
  },
};
