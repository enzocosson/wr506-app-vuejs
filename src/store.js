import { createStore } from "vuex";

const store = createStore({
  state: {
    isPopupOpen: false,
    isPopupEdit: false,
    dataMovieInfo: [],
    dataMovieEdit: [],
  },
  mutations: {
    togglePopup(state) {
      state.isPopupOpen = !state.isPopupOpen;
    },
    togglePopupEdit(state) {
      state.isPopupEdit = !state.isPopupEdit;
    },
    addDataMovieInfo(state, movieData) {
      state.dataMovieInfo.push(movieData);
    },
    clearDataMovieInfo(state) {
      state.dataMovieInfo = [];
    },
    addDataMovieEdit(state, movieData) {
      state.dataMovieEdit.push(movieData);
    },
    clearDataMovieEdit(state) {
      state.dataMovieEdit = [];
    },
  },
});

export default store;
