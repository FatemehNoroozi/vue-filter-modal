<template>
    <div class="accordion">
      <h3 @click="toggle" class="accordion-header">{{ filter.title }}</h3>
      <div v-show="isOpen" class="accordion-content">
        <input v-if="filter.hasSearch" type="text" v-model="searchTerm" placeholder="Search" />
        <div v-for="item in filteredItems" :key="item.id">
          <div v-if="item.childs && item.childs.length">
            <label>{{ item.name }}</label>
            <div v-for="child in item.childs" :key="child.id">
              <input type="checkbox" 
                     :id="child.id" 
                     :checked="isChildSelected(child)" 
                     @change="selectChild(child)" />
              <label :for="child.id">{{ child.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterAccordion',
    props: ['filter'],
    data() {
      return {
        isOpen: false,
        searchTerm: '',
      };
    },
    computed: {
      filteredItems() {
        return this.filter.items.filter(item => 
          item.name.includes(this.searchTerm) || 
          (item.childs && item.childs.some(child => child.name.includes(this.searchTerm)))
        );
      },
      selectedFilters() {
        return this.$store.state.selectedFilters; // دسترسی به فرزندان انتخاب‌شده از استور
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      selectChild(child) {
        if (this.isChildSelected(child)) {
          // اگر فرزند انتخاب شده بود، آن را از استور حذف کنید
          this.$store.commit('removeChild', child.id);
        } else {
          // اگر فرزند انتخاب نشده بود، آن را به استور اضافه کنید
          this.$store.commit('addChild', child);
        }
        
        this.$emit('filter-selected', child.name);
      },
      // بررسی انتخاب فرزند
      isChildSelected(child) {
        return this.selectedFilters.some((selectedChild) => selectedChild.id === child.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .accordion-header {
    cursor: pointer;
    background-color: #f1f1f1;
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 5px;
  }
  .accordion-content {
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 5px;
  }
  </style>
  