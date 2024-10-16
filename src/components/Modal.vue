<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Filters</h2>
            <div v-for="filter in filters" :key="filter.filterKey">
                <FilterAccordion :filter="filter" @filter-selected="$emit('filter-selected', $event)"></FilterAccordion>
            </div>
            <button @click="$emit('close')">X</button>
        </div>
    </div>
</template>

<script>
import FilterAccordion from './Accordion.vue';

export default {
    name: 'FilterModal',
    components: { FilterAccordion },
    props: ['filters'],
};
</script>

<style scoped>
.modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
