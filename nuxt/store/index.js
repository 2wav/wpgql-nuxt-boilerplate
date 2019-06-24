export const strict = false;

/* eslint-disable no-shadow */
export const state = () => ({
  counter: 0
});

export const mutations = {
  increment(state) {
    state.counter += 1;
  }
};
