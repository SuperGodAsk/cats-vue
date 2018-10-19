<template>
    <div>
        <transition name="modal">
            <div class="modal fade show" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Хочешь приютить этого котика?</h5>
                            <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    @click="toggleModal"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Нравится <strong>{{ cat.name }}?</strong></p>
                            <CatPropsList :propsList="activeCatProperties" />
                        </div>
                        <div class="modal-footer">
                            <button
                                    type="button"
                                    class="btn btn-primary"
                                    @click="getCat"
                            >Приютить</button>
                            <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                    @click="cancelCat">
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="modal-backdrop fade show"></div>
        </transition>
    </div>
</template>

<script>
    import CatPropsList from "./CatDetail/CatPropsList.vue";
    export default {
        name: "CatModal",
        components: {CatPropsList},
        props: {
            cat: {
                type: Object,
                required: true
            },
            activeCatProperties: Array
        },
        methods: {
            toggleModal: function () {
                this.$emit('toggleModal')
            },
            cancelCat () {
                this.$emit('cancelCat',this.cat)
            },
            getCat(){
                this.$emit('getCat', this.cat)
            }
        }
    }
</script>

<style scoped>
    .modal {
        display: block;
    }
    .modal-enter-active, .modal-leave-active{
        transition: all .5s;
    }
    .modal-enter, .modal-leave-to{
        transform:  translateY(-100px);
    }
    .fade-enter-active{
        animation: .75s fade forwards;
    }
    .fade-leave-active{
        animation: .75s fade reverse;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.5;
        }
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>