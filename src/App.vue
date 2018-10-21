<template>
  <body id="app">
    <template-header/>
    <transition :name="transitionName" appear>
      <router-view class="page-container"/>
    </transition>
    <template-footer/>
    <template-copyright/>
  </body>
</template>
<style lang="scss">
    /*Animation fix */
    body {
        display: flex;
        flex-direction: column;
    }
    .page-container{
        position: relative;
        width: 100%;
    }
    .slide-left-enter-active .main-wrapper,
    .slide-right-enter-active .main-wrapper,
    .slide-left-leave-active .main-wrapper,
    .slide-right-leave-active .main-wrapper
    {
        position: absolute;
        width: 100%;
        top: 0;
        transform: translateX(-50%);
        left: 50%;
    }

    .slide-left-enter-active + footer,
    .slide-right-enter-active + footer{
        margin-top: 200vh;
    }
    /*End animtation fix */

    .slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active{
        transition:1s ease-in-out;

    }
    .slide-left-enter{
        transform: translate(-100%,0);
    }
    .slide-left-enter-to{
        transform: translate(0,0);
    }
    .slide-right-enter{
        transform: translate(100%,0);
    }
    .slide-right-enter-to{
        transform: translate(0,0);
    }
    .slide-left-leave{
        transform: translate(0,0);
    }
    .slide-left-leave-to{
        transform: translate(100%,0);
    }
    .slide-right-leave{
        transform: translate(0,0);
    }
    .slide-right-leave-to{
        transform: translate(-100%,0);
    }
@import'~bootstrap/dist/css/bootstrap.css'

</style>
<script>
    import TemplateHeader from "./components/TemplateHeader";
    import TemplateFooter from "./components/TemplateFooter";
    import TemplateCopyright from "./components/TemplateCopyright";

    export default {
        components: {TemplateCopyright, TemplateFooter, TemplateHeader},
        data () {
            return {
                transitionName : 'slide-left'
            }
        },
        watch: {
            '$route' (to, from) {
                scroll(0, 0)
                this.transitionName = (to.name === 'home') ? 'slide-left' : 'slide-right'
            }
        }
    }
</script>
