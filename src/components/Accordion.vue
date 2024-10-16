<template>
    <div class="accordion">
        <h3 @click="toggle" class="accordion-header">{{ filter.title }}</h3>
        <div v-show="isOpen" class="accordion-content">
            <input v-if="filter.hasSearch" type="text" v-model="searchTerm" placeholder="جستجو..." />
            <div v-for="item in filteredItems" :key="item.id">
                <div v-if="filter.mode === 'single'">
                    <input type="radio" :id="item.id" :name="filter.filterKey" @change="selectItem(item)" />
                    <label :for="item.id">{{ item.name }}</label>
                </div>
                <div v-else-if="filter.mode === 'multiple'">
                    <input type="checkbox" :id="item.id" @change="selectItem(item)" />
                    <label :for="item.id">{{ item.name }}</label>
                </div>
                <div v-if="item.childs && item.childs.length">
                    <div v-for="child in item.childs" :key="child.id">
                        <input type="checkbox" :id="child.id" @change="selectChild(child)" />
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
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            this.$emit('filter-selected', item.name);
        },
        selectChild(child) {
            this.$emit('filter-selected', child.name);
        },
    },
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
