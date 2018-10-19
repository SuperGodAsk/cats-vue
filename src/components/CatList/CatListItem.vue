<template>
    <li class="list-group-item list-group-item-action pointer"
        :class="{ active: checkActive() }"
        @click="selectCat"
    >{{catItem.name}}</li>
</template>

<script>

    export default {
        name: "CatListItem",
        props:{
            catItem: Object,
            currentCat: Object
        },
        methods: {
            selectCat: function () {
                this.$emit('selectCat', this.catItem);
            },
            checkActive: function () {
                return (this.catItem === this.currentCat) ? true : false;
            }
        }
    }
</script>

<style scoped>
.pointer{
    cursor: pointer;
}
</style>