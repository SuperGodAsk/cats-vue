<template>
    <div class="col-md-8 pt-3">
        <div class="row">
            <div class="col-md-5">
                <h2>{{ cat.name }}</h2>
                <img
                        :src="cat.img"
                        :alt="cat.name"
                        class="rounded cat-image">
            </div>
            <div class="col-md-7 pt-2">
                <h5>Информация о котике</h5>
                <CatPropsList :propsList="activeCatProperties"/>

                <div class="phone-block mb-3">
                    <transition name="phone">
                        <p v-if="phoneVisibility">{{ cat.phone }}</p>
                    </transition>
                </div>

                <button
                        class="btn btn-outline-success mr-3"
                        @click="phoneVisibility = !phoneVisibility"
                        v-text="buttonText"
                />
                <button
                        class="btn btn-primary"
                        @click="toggleModal"
                >Приютить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import CatPropsList from "./CatPropsList.vue";

    export default {
        name: "CatDetail",
        components: {CatPropsList},
        props: {
            cat: {
                type: Object,
                required: true
            },
            activeCatProperties: Array,
        },
        data () {
            return {
                phoneVisibility : false
            }
        },
        computed: {
            buttonText: function () {
                return this.phoneVisibility ? 'Скрыть телефон' : 'Показать телефон'
            }
        },
        methods: {
            toggleModal: function () {
                this.$emit('toggleModal')
            }
        }
    }
</script>

<style scoped>
    .cat-image {
        height: 200px;
    }
    .phone-block{
        height: 36px;
    }
    .phone-enter-active, .phone-leave-active{
        transition: all .5s;
    }
    .phone-enter, .phone-leave-to{
        transform:  translateX(50px);
        opacity: 0;
    }

</style>
