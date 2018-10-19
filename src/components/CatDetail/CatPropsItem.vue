<template>
    <li>{{ keys[0] }} - <strong>{{ prop[keys[0]] }}</strong></li>
</template>

<script>
    export default {
        name: "CatPropsItem",
        props:{
            prop:{
                type: Object,
                required: true
            },
            keys: Array
        }
    }
</script>

<style scoped>

</style>