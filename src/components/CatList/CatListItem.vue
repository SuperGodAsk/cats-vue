<template>
    <v-list-tile
            avatar
            @click="selectCat"
    >
        <v-list-tile-action>
            <v-icon :color="checkActive() ? 'green' : 'grey'">check_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-avatar>
            <img :src="catItem.imagesList[0].url">
        </v-list-tile-avatar>

        <v-list-tile-content>
            <v-list-tile-title v-html="catItem.name" :class="checkActive() ? 'primary--text' : ''"></v-list-tile-title>
            <v-list-tile-sub-title>
                Владелец: {{catItem.owner}}
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>

    export default {
        name: "CatListItem",
        props:{
            catItem: Object,
            currentCat: Object
        },
        methods: {
            selectCat () {
                this.$emit('selectCat', this.catItem);
            },
            checkActive () {
                return (this.catItem == this.currentCat) ? true : false;
            }
        }
    }
</script>

<style scoped>
.pointer{
    cursor: pointer;
}
</style>
