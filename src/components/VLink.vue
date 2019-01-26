<template>
        <router-link :to="href" exact-active-class="active">
                <slot></slot>
        </router-link>
</template>

<script>
    export default {
        name: "VLink",
        props: {
            href: String,
            required: true
        }
    }
</script>

<style scoped>

</style>
