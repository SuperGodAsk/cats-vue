<template>
    <div class="cats-list">
        <transition name="fade">
            <div class="alert alert-info" v-show="showAlert">
                <button
                        type="button"
                        class="close"
                        @click="showAlert = !showAlert"
                >
                    X
                </button>
                <h4>Запись добавлена в коллекцию!</h4>
            </div>
        </transition>
        <div class="row bg-primary text-white font-weight-bold">
            <div class="col-3 py-3 pl-5">Имя</div>
            <div class="col-3 py-3 pl-5">Хозяин</div>
            <div class="col-3 py-3 pl-5">Телефон для связи</div>
            <div class="col-3 py-3 pl-5">Удалить?</div>
        </div>
        <div class="row">
            <transition-group name="list" class="col-12 d-flex flex-column align-items-stretch" tag="div">
                <div v-for="(cat) in cats" :key="cat.id"
                     class="row d-inline-flex border-bottom border-primary">
                    <div class="col-3 py-3 pl-5">{{cat.name}}</div>
                    <div class="col-3 py-3 pl-5">{{cat.owner}}</div>
                    <div class="col-3 py-3 pl-5">{{cat.phone}}</div>
                    <div class="col-3 py-3 pl-5">
                        <button
                                type="button"
                                class="btn btn-danger mx-auto"
                                title="Удалить из коллекции"
                                @click="deleteCat(cat.id)"
                        >X
                        </button>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {db, storage} from '@/main'

    export default {
        name: "CatsAddList",
        data(){
            return {
                cats: [],
                showAlert: false
            }
        },
        firestore() {
            return {
                cats: db.collection('cats').orderBy('createdAt', 'asc')
            }
        },
        methods: {
            deleteCat(id) {
                db.collection('cats').doc(id).delete()
            },
        }
    }
</script>

<style scoped>
    .cats-list {
        margin-top: 2rem;
    }
    .list-move {
        transition: 1s;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */
    {
        opacity: 0;
        transform: translateX(-50px);
    }
</style>
