<template>
  <div id="app">
    <template-header/>
    <router-view/>
    <template-footer/>
    <template-copyright/>
  </div>
</template>

<style lang="scss">
@import'~bootstrap/dist/css/bootstrap.css'
</style>
<script>
    import TemplateHeader from "./components/TemplateHeader";
    import TemplateFooter from "./components/TemplateFooter";
    import TemplateCopyright from "./components/TemplateCopyright";
    export default {
        components: {TemplateCopyright, TemplateFooter, TemplateHeader}
    }
</script>
