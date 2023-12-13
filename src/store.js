import { createStore } from "vuex";

const store = createStore({
  state: {
    isPopupOpen: false,
    isPopupEdit: false,
  },
  mutations: {
    togglePopup(state) {
      state.isPopupOpen = !state.isPopupOpen;
    },
    togglePopupEdit(state) {
      state.isPopupEdit = !state.isPopupEdit;
    },
  },
});

export default store;
