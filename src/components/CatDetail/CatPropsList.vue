<template>
    <ul v-if="propsList.length">
        <CatPropsItem
                v-for="prop of propsList"
                :prop="prop"
                :keys="Object.keys(prop)"

        />
    </ul>
</template>

<script>
    import CatPropsItem from "./CatPropsItem.vue";
    export default {
        name: "CatPropsList",
        components: {CatPropsItem},
        props:{
            propsList:{
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>