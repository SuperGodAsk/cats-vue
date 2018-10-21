<template>
    <div>
        <div class="container main-wrapper">
            <cat-title title="Котеечный приют"></cat-title>
            <div class="row">
                <div class="col-md-4">
                    <CatInput v-model="search" />
                    <hr>
                    <CatList :catsList="filteredCats"
                             :currentCat="filteredCats[0]"

                             @selectCat="selectCat"/>
                </div>
                <CatDetail
                        :cat="activeCat"
                        @toggleModal="toggleModal"
                        :activeCatProperties="activeCatProperties"
                />
            </div>
            <CatLogs
                    :logs="logs"
                    v-if="logs.length"
            />
            <CatModal
                    v-if="modalVisibility"
                    @toggleModal="toggleModal"
                    @getCat="getCat"
                    @cancelCat="cancelCat"
                    :cat="activeCat"
                    :activeCatProperties="activeCatProperties"/>
        </div>
    </div>

</template>

<script>
    import CatTitle from '@/components/CatTitle.vue'
    import CatList from '@/components/CatList/CatList.vue'
    import CatDetail from '@/components/CatDetail/CatDetail.vue'
    import CatModal from "@/components/CatModal.vue";
    import CatLogs from "@/components/CatLogs.vue";
    import CatInput from "@/components/CatInput.vue";

    import {db} from '../main'


    let nextId = 1;

    const log = (text, type, date = new Date()) => ({text,type,date});
    const catConstructor = (id, name, img, color, phone, owner, age) => ({id, name, img, color, phone, owner, age});

    const cats = [
        catConstructor(nextId++, "Иннокентий", '/assets/images/1.jpg', "Серый", "+7 954 654 98 74", "Макс", "3 года"),
        catConstructor(nextId++, "Василий", '/assets/images/2.jpg', "Бурый", "+7 649 874 32 14", "Юлия", "2 года"),
        catConstructor(nextId++, "Пётр", '/assets/images/3.jpg', "Рыжий", "+7 954 333 68 98", "Колян", "4 года"),
    ];

    export default {
        name: "Cats",
        props: {},
        data() {
            return {
                cats: [],
                search: '',
                modalVisibility: false,
                logs: [],
            }
        },
        firestore(){
            return {
                cats: db.collection('cats').orderBy('createdAt', 'desc'),
            }
        },
        components: {
            CatInput,
            CatLogs,
            CatModal,
            CatTitle, CatList, CatDetail
        },
        methods: {
            selectCat(catItem) {
                this.activeCat = catItem;
            },
            toggleModal() {
                this.modalVisibility = !this.modalVisibility
            },
            getCat(cat){
                this.modalVisibility = false;
                this.logs.push(
                    log(`Была оставлена заявка на приручение котика: ${cat.name}. Владелец: ${cat.owner}. Телефон: ${cat.phone}.`,true)
                )
            },
            cancelCat(cat){
                this.modalVisibility = false;
                this.logs.push(
                    log(`Котик: ${cat.name} остался без владельца ;( . Владелец: ${cat.owner}. Телефон: ${cat.phone}.`,false)
                )
            }
        },
        computed: {
            activeCat(){
                return this.cats[0]
            },
            filteredCats() {
                return this.cats.filter(cat => {
                    return cat.name.indexOf(this.search) > -1 || cat.color.indexOf(this.search) > -1
                })
            },
            // activeCatProperties () {
            //     return [
            //         {"Цвет": this.activeCat.color},
            //         {"Владелец": this.activeCat.owner},
            //         {"Возраст": this.activeCat.age}
            //     ]
            // }
        }
    }
</script>

<style scoped>
.main-wrapper{
    padding-top: calc(6rem + 106px);
    padding-bottom: 6rem;
}
</style>
