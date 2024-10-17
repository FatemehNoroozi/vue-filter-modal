<template>
    <div class="accordion">
        <h3 @click="toggle" class="accordion-header">{{ filter.title }}</h3>
        <div v-show="isOpen" class="accordion-content">
            <input v-if="filter.hasSearch" type="text" v-model="searchTerm" placeholder="Search" />
            <div v-for="item in filteredItems" :key="item.id">
                <div v-if="item.childs && item.childs.length">
                    <label>{{ item.name }}</label>
                    <div v-for="child in item.childs" :key="child.id">
                        <input type="checkbox" :id="child.id" :checked="isChildSelected(child)"
                            @change="selectChild(child)" />
                        <label :for="child.id">{{ child.name }}</label>
                    </div>
                </div>
                <div v-else>
                    <div v-if="filter.mode === 'single'">
                        <input type="radio" :id="item.id" :name="filter.filterKey" :checked="isItemSelected(item)"
                            @change="selectItem(item)" />
                        <label :for="item.id">{{ item.name }}</label>
                    </div>
                    <div v-else-if="filter.mode === 'multiple'">
                        <input type="checkbox" :id="item.id" :checked="isItemSelected(item)"
                            @change="selectItem(item)" />
                        <label :for="item.id">{{ item.name }}</label>
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
            return this.$store.state.selectedFilters; // دسترسی به فیلترهای انتخاب‌شده از استور
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            this.$emit('filter-selected', item.name);
            this.$store.commit('addFilter', item); // ذخیره فیلتر انتخاب‌شده
        },
        selectChild(child) {
            const parentFilter = this.filter; // فرض بر این است که parent filter در props موجود است
            // جستجو برای یافتن فیلتر والد در selectedFilters
            const existingFilter = this.selectedFilters.find(filter => filter.id === parentFilter.id);

            if (existingFilter) {
                // اگر فیلتر والد قبلاً وجود دارد، فقط فرزند جدید را اضافه می‌کنیم
                if (!existingFilter.childs) {
                    existingFilter.childs = []; // اگر childs وجود ندارد، آن را ایجاد می‌کنیم
                }
                if (!existingFilter.childs.some(c => c.id === child.id)) {
                    existingFilter.childs.push(child); // فقط فرزند جدید را اضافه می‌کنیم
                }
                this.$store.commit('updateFilter', existingFilter); // به‌روزرسانی فیلتر والد
            } else {
                // اگر فیلتر والد وجود ندارد، یک فیلتر جدید ایجاد می‌کنیم
                this.$store.commit('addFilter', {
                    id: parentFilter.id,
                    name: parentFilter.name,
                    childs: [child] // فقط فرزند انتخاب‌شده را به فیلتر اضافه می‌کنیم
                });
            }
        },

        isItemSelected(item) {
            return this.selectedFilters.some(filter => filter.id === item.id);
        },
        isChildSelected(child) {
            return this.selectedFilters.some(filter =>
                filter.childs && filter.childs.some(c => c.id === child.id)
            );
        }
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
