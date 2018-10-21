<template>
    <div>
        <div class="container main-wrapper">
            <h1>Добавление котика</h1>
            <form class="form-list" @submit.prevent="addCat">
                <div class="form-row">
                    <div class="form-group col-4">
                        <label for="catName" class="col-12">Имя кота</label>
                        <div class="col-10">
                            <input
                                    type="text"
                                    class="form-control"
                                    id="catName"
                                    v-model.trim="$v.name.$model"
                                    :class="{ 'is-invalid': $v.name.$error }"
                            >
                            <div class="invalid-feedback" v-if="!$v.name.required">
                                Поле обязательное
                            </div>
                            <div class="invalid-feedback" v-if="!$v.name.minLength">
                                Имя должно состоять минимум из {{$v.name.$params.minLength.min}} букв
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-4">
                        <label for="catOwner" class="col-12">Имя владельца</label>
                        <div class="col-10">
                            <input
                                    type="text"
                                    class="form-control"
                                    id="catOwner"
                                    v-model.trim="$v.owner.$model"
                                    :class="{ 'is-invalid': $v.owner.$error }"
                            >
                            <div class="invalid-feedback" v-if="!$v.owner.required">
                                Поле обязательное
                            </div>
                            <div class="invalid-feedback" v-if="!$v.owner.minLength">
                                Имя должно состоять минимум из {{$v.owner.$params.minLength.min}} букв
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-4">
                        <label for="ownerPhone" class="col-12">Телефон для связи</label>
                        <div class="col-10">
                            <input
                                    type="text"
                                    class="form-control"
                                    id="ownerPhone"
                                    v-model.trim="$v.phone.$model"
                                    :class="{ 'is-invalid': $v.phone.$error }"
                            >
                            <div class="invalid-feedback" v-if="!$v.phone.required">
                                Поле обязательное
                            </div>
                            <div class="invalid-feedback" v-if="!$v.phone.validPhone">
                                Укажите телефон в правильном формате
                            </div>
                        </div>
                    </div>

                </div>
                <transition name="list">
                    <button v-if="!$v.$invalid" class="btn btn-primary">Добавить</button>
                </transition>
            </form>
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
                        <div v-for="(cat,idx) in cats" :key="idx" class="row d-inline-flex border-bottom border-primary">
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
        </div>
    </div>
</template>

<script>
    import {db} from '../main'
    import {required, minLength} from 'vuelidate/lib/validators'

    const phoneReg = /^\d[\d\(\)\ -]{4,14}\d$/
    const validPhone = (value) => phoneReg.test(value)

    export default {
        name: "CatsAdd",
        data() {
            return {
                cats: [],
                image: '',
                name: '',
                owner: '',
                phone: '',
                submitStatus: null,
                showAlert: false,
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4)
            },
            owner: {
                required,
                minLength: minLength(4)
            },
            phone: {
                required,
                validPhone
            }
        },
        firestore() {
            return {
                cats: db.collection('cats').orderBy('createdAt', 'asc')
            }
        },
        methods: {
            addCat() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    const name = this.$v.name.$model,
                        owner = this.$v.owner.$model,
                        phone = this.$v.phone.$model,
                        createdAt = new Date()

                    db.collection('cats').add({name, owner, phone, createdAt})
                    this.$v.$reset()
                    this.showAlert = true
                    setTimeout(() => {
                        this.showAlert = false
                    }, 1500);
                }
            },
            deleteCat(id) {
                db.collection('cats').doc(id).delete()
            },
            shuffle: function () {
                this.cats.sort((a, b) => Math.random() - 0.5)
            }
        }
    }
</script>

<style scoped>
    .cats-list {
        margin-top: 2rem;
    }

    .main-wrapper {
        padding-top: calc(6rem + 106px);
        padding-bottom: 6rem;
    }

    .fade-enter-active, .fade-leave-active{
        transition: .7s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
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
