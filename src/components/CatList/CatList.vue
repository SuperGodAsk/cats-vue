<template>
    <ul class="list-group" v-if="catsList.length">
        <CatListItem
                v-for="catItem in catsList"
                :key="catItem.id"
                :catItem="catItem"
                :currentCat="activeCat"
                @selectCat="selectCat"
        />
    </ul>
</template>

<script>
    import CatListItem from './CatListItem.vue'

    export default {
        name: "CatsList",
        props: {
            currentCat: Object,
            catsList: Array
        },
        components: {
            CatListItem,
        },
        data () {
            return {
                activeCat: this.currentCat
            }
        },
        methods: {
            selectCat: function (catItem) {
                this.activeCat = catItem;
                this.$emit('selectCat', catItem);
            }
        }
    }
</script>

<style scoped>

</style>