<template>
    <v-card>
        <v-card-title class="headline">Хочешь приютить этого котика?</v-card-title>
        <v-card-text>
            <p>Нравится <strong>{{ cat.name }}?</strong></p>
            <!--@TODO: Поправить вывод свойств -->
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="getCat"
            >
                Приютить
            </v-btn>

            <v-btn
                    color="red darken-1"
                    flat="flat"
                    @click="cancelCat"
            >
                Отказаться
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    export default {
        name: "CatModal",
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
