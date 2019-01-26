<template>
    <v-toolbar>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Котеечный приют</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat
                   v-for="item in menuItems"
                   :key="item.title"
                   :to="item.link"
            >
                <span>{{ item.title }}</span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        name: "TemplateHeader",
        created() {
            this.$router.options.routes.forEach(route => {
                this.menuItems.push({
                    title: route.name,
                    link: route.path
                })
            })
        },
        data() {
            return {
                menuItems: []
            }
        }
    }
</script>

<style scoped>

</style>
