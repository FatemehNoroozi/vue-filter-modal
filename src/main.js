import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import "./styles.scss";

Vue.config.productionTip = false;

Vue.use(Vuex);

// ایجاد استور Vuex
const store = new Vuex.Store({
  state: {
    selectedFilters: [], // آرایه برای نگهداری فرزندان انتخاب‌شده
  },
  mutations: {
    // اضافه کردن child جدید
    addChild(state, child) {
      const existingChild = state.selectedFilters.find((c) => c.id === child.id);
      if (!existingChild) {
        state.selectedFilters.push(child); // افزودن child جدید به selectedFilters
      }
    },

    // حذف یک child
    removeChild(state, childId) {
      state.selectedFilters = state.selectedFilters.filter((child) => child.id !== childId);
    }
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
