<template>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">Котеечный приют</a>
            <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <v-link href="/">Главная</v-link>
                    <v-link href="/cats">Выбор котика</v-link>
                    <v-link href="/cats/add">Добавить котика</v-link>
                    <v-link href="/login">Авторизация</v-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import VLink from "@/components/VLink";
    export default {
        name: "TemplateHeader",
        components: {VLink},
    }
</script>

<style scoped>

</style>
