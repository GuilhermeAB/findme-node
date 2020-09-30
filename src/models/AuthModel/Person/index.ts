import store from './store/store';

export type PersonType = {
  id?: number,
  name: string,
};

export default {
  store: store,
};
