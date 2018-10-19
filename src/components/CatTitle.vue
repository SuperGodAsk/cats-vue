<template>
    <div class="row mb-3">
        <div class="col">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
          title: String,
        },
        name: "CatTitle"
    }
</script>

<style scoped>

</style>