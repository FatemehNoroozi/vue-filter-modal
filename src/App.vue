<template>
    <div class="app">
        <button @click="showModal = true">باز کردن فیلترها</button>
        <modal v-if="showModal" @close="closeModal" :filters="filters" @filter-selected="updateSelectedFilters"></modal>
        <div class="selected-filters">
            <h2>فیلترهای انتخاب‌شده:</h2>
            <div v-for="(filter, index) in selectedFilters" :key="index" class="filter-item">
                <span>{{ filter }}</span>
                <button @click="removeFilter(filter)">حذف</button>
            </div>
            <button v-if="selectedFilters.length" @click="clearFilters">حذف تمامی فیلترها</button>
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
            selectedFilters: [],
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        updateSelectedFilters(filter) {
            if (!this.selectedFilters.includes(filter)) {
                this.selectedFilters.push(filter);
            }
        },
        removeFilter(filter) {
            this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
        },
        clearFilters() {
            this.selectedFilters = [];
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
