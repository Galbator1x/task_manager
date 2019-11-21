import Routes from 'Routes';
import Fetch from 'utils/Fetch';
import { decamelize } from 'utils/keysConverter';

export default {
  getTasks(params) {
    const path = Routes.apiV1TasksPath(decamelize(params));

    return Fetch.get(path);
  },

  getTask(id) {
    const path = Routes.apiV1TaskPath(id);

    return Fetch.get(path);
  },

  createTask(params) {
    const path = Routes.apiV1TasksPath();

    return Fetch.post(path, params);
  },

  updateTask(id, params) {
    const path = Routes.apiV1TaskPath(id);

    return Fetch.put(path, params);
  },

  deleteTask(id) {
    const path = Routes.apiV1TaskPath(id);

    return Fetch.delete(path);
  },
};
