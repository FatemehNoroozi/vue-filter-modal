import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import "./styles.scss";

Vue.config.productionTip = false;

Vue.use(Vuex);

// ایجاد استور Vuex
const store = new Vuex.Store({
  state: {
    selectedFilters: [], // آرایه برای نگهداری فیلترهای انتخاب‌شده
  },
  mutations: {
    addFilter(state, filter) {
      const existingFilterIndex = state.selectedFilters.findIndex(
        (f) => f.id === filter.id
      );
      if (existingFilterIndex !== -1) {
        // اگر فیلتر وجود دارد، فرزندان را به‌روزرسانی می‌کنیم
        Vue.set(state.selectedFilters, existingFilterIndex, {
          ...state.selectedFilters[existingFilterIndex],
          childs: filter.childs,
        });
      } else {
        // اگر فیلتر وجود ندارد، فیلتر جدید را به آرایه اضافه می‌کنیم
        state.selectedFilters.push(filter);
      }
    },

    removeFilter(state, filterId) {
      state.selectedFilters = state.selectedFilters.filter(
        (filter) => filter.id !== filterId
      ); // حذف فیلتر با ID مشخص
    },
    updateFilter(state, updatedFilter) {
      const index = state.selectedFilters.findIndex(
        (filter) => filter.id === updatedFilter.id
      ); // پیدا کردن ایندکس فیلتر
      if (index !== -1) {
        Vue.set(state.selectedFilters, index, updatedFilter); // به‌روزرسانی فیلتر
      }
    },
    // متد جدید برای حذف یک child از selectedFilters
    removeChild(state, { filterId, childId }) {
      const filter = state.selectedFilters.find((f) => f.id === filterId);
      if (filter && filter.childs) {
        filter.childs = filter.childs.filter((child) => child.id !== childId);
      }
    },
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
