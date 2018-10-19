<template>
    <li class="nav-item mx-0 mx-lg-1">
        <router-link :to="href" class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" exact-active-class="active">
                <slot></slot>
        </router-link>
    </li>
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
