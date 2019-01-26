<template>
    <v-text-field
        label="Приюти себе котика"
        placeholder="Введите имя"
        append-icon="search"
        v-bind:value="value"
        v-on:input="$emit('input',$evet.target.value)">
    </v-text-field>
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
