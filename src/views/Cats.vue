<template>
    <v-layout>
        <v-flex xs-12>
            <v-layout>
                <v-flex md4 sm12 px-4>
                    <h1>Наши котики</h1>
                    <v-text-field
                            label="Приюти себе котика"
                            placeholder="Введите имя"
                            append-icon="search"
                            v-model="search">
                    </v-text-field>
                    <CatList :catsList="filteredCats"
                             :currentCat="filteredCats[0]"

                             @selectCat="selectCat"/>
                </v-flex>
                <v-flex md8 sm12>
                        <CatDetail
                                v-if="activeCat"
                                :cat="activeCat"
                                @toggleModal="toggleModal"
                        />
                </v-flex>
                <v-snackbar
                        v-if="logs.length"
                        v-for="log in logs"
                        v-model="log.show"
                        bottom
                        right
                        timeout="4000"

                >
                    {{log.text}}
                    <v-btn
                            color="pink"
                            flat
                            @click="log.show = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
                <v-dialog
                        v-model="modalVisibility"
                        max-width="400"
                >
                    <CatModal
                            @toggleModal="toggleModal"
                            @getCat="getCat"
                            @cancelCat="cancelCat"
                            :cat="activeCat"
                            :activeCatProperties="activeCatProperties"
                    />
                </v-dialog>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import CatList from '@/components/CatList/CatList.vue'
    import CatDetail from '@/components/CatDetail/CatDetail.vue'
    import CatModal from "@/components/CatModal.vue";
    import CatLogs from "@/components/CatLogs.vue";
    import CatInput from "@/components/CatInput.vue";

    import {db} from '../main'


    let nextId = 1;

    const log = (text, type, date = new Date(), show = true) => ({text, type, date, show});

    export default {
        name: "Cats",
        props: {},
        data() {
            return {
                cats: [],
                search: '',
                modalVisibility: false,
                logs: [],
                activeCat: {},
            }
        },
        firestore() {
            return {
                cats: db.collection('cats').orderBy('createdAt', 'desc'),
            }
        },
        components: {
            CatInput,
            CatLogs,
            CatModal,
            CatList, CatDetail
        },
        methods: {
            selectCat(catItem) {
                this.activeCat = catItem;
            },
            toggleModal() {
                this.modalVisibility = !this.modalVisibility
            },
            getCat(cat) {
                this.modalVisibility = false;
                this.logs.push(
                    log(`Была оставлена заявка на приручение котика: ${cat.name}.`, true),
                )
            },
            cancelCat(cat) {
                this.modalVisibility = false;
                this.logs.push(
                    log(`Котик ${cat.name} остался без владельца :(`, false)
                )
            }
        },
        computed: {
            filteredCats() {
                return this.cats.filter(cat => {
                    return cat.name.indexOf(this.search) > -1
                })
            },
        }
    }
</script>
