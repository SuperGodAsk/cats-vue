<template>
    <div class="form-group">
        <label for="search">Приюти себе котика</label>
        <input
                type="text"
                class="form-control"
                id="search"
                placeholder="Введите имя"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script>
    export default {
        name: "CatInput",
        props: {
            value : String,
        }
    }
</script>

<style scoped>

</style>