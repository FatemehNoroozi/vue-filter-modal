<template>
    <div class="app">
        <button @click="showModal = true">Show Search Modal</button>
        {{ filters }}
        <modal v-if="showModal" @close="closeModal" :filters="filters" @filter-selected="updateSelectedFilters"></modal>
        <div class="selected-filters">
            <h2>Selected Filters</h2>

         {{ selectedFilters }}
        
            <div v-for="(filter, index) in selectedFilters" :key="index" class="filter-item">
                <span>{{ filter }}</span>
                <button @click="removeFilter(filter)">Remove</button>
            </div>
            <button v-if="selectedFilters.length" @click="clearFilters">Remove All Filters</button>
        </div>
    </div>
</template>

<script>
import Modal from './components/Modal.vue';
import filters from '../filters.json';

export default {
    components: { Modal },
    data() {
        return {
            showModal: false,
            filters: filters.filters,
            // selectedFilters: [],
        };
    },
    computed: {
        selectedFilters() {
            return this.$store.state.selectedFilters;  // دسترسی به آرایه فیلترها از استور
        },

    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        updateSelectedFilters(filter) {
            this.$store.commit('addFilter', filter);
            // if (!this.selectedFilters.includes(filter)) {
            //     this.selectedFilters.push(filter);
            // this.$store.commit('addFilter', filter);

        },
        // removeFilter(filter) {
        //     this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
        // },
        clearFilters() {
            this.selectedFilters = [];
        },

        removeFilter(filter) {
            console.log("filter", filter )
            this.$store.commit('removeFilter', filter);  // حذف فیلتر با ID مشخص
        },
        editFilter(filter) {
            const updatedFilter = {
                id: filter.id,
                name: prompt("Update filter name:", filter.name) || filter.name,  // نمایش پنجره برای ویرایش نام فیلتر
            };
            this.$store.commit('updateFilter', updatedFilter);  // ارسال فیلتر به‌روزرسانی‌شده به استور
        },
    },


};
</script>

<style scoped>
.selected-filters {
    margin-top: 20px;
}

.filter-item {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}
</style>
