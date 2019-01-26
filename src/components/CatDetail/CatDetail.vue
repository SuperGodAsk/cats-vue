<template>
    <v-slide-y-transition mode="out-in">
        <v-layout justify-center>
            <v-flex md8 xs12>
                <v-card>
                    <v-carousel height="250">
                        <v-carousel-item
                                v-for="(item,i) in cat.imagesList"
                                :key="i"
                                :src="item.url"
                                height="250"
                        ></v-carousel-item>
                    </v-carousel>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="headline mb-2">{{ cat.name }}</h2>
                            <!--@TODO Настроить вывод свойств -->
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-scroll-x-transition>
                            <v-btn
                                    small
                                    flat
                                    color="primary"
                                    v-if="phoneVisibility"
                            >
                                <v-icon>phone</v-icon>
                                {{cat.phone}}
                            </v-btn>
                        </v-scroll-x-transition>
                        <v-spacer></v-spacer>
                        <v-btn color="green"
                               @click="phoneVisibility = !phoneVisibility"
                               v-text="buttonText"></v-btn>
                        <v-btn color="blue"
                               @click="toggleModal"
                        >Приютить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-slide-y-transition>
</template>

<script>
    export default {
        name: "CatDetail",
        props: {
            cat: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                phoneVisibility: false
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
