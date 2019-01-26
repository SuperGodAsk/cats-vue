<template>
    <v-list v-if="catsList.length">
        <CatListItem
                v-for="catItem in catsList"
                :key="catItem.id"
                :catItem="catItem"
                :currentCat="activeCat"
                @selectCat="selectCat"
        />
    </v-list>
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
                this.$store.commit('setActiveCat',catItem)
            }
        }
    }
</script>

<style scoped>

</style>
