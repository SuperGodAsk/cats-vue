<template>
    <form class="form-list" @submit.prevent="addCat" enctype="multipart/form-data" novalidate>
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
        <cats-add-image-uploader
                @addImage="addImage"
                @deleteImage="deleteImage"
                :imagesList="imagesList"
        />
        <transition name="list">
            <button v-if="!$v.$invalid" class="btn btn-primary">Добавить</button>
        </transition>
    </form>
</template>

<script>
    import {db, storage} from '@/main'
    import {required, minLength} from 'vuelidate/lib/validators'
    import CatsAddImageUploader from "./CatsAddImageUploader";

    const phoneReg = /^\d[\d\(\)\ -]{4,14}\d$/
    const validPhone = (value) => phoneReg.test(value)

    export default {
        name: "CatsAddForm",
        components: {CatsAddImageUploader},
        data() {
            return {
                name: '',
                owner: '',
                phone: '',
                submitStatus: null,
                showAlert: false,
                imagesList: []
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
        methods: {
            addCat() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    const name = this.$v.name.$model,
                        owner = this.$v.owner.$model,
                        phone = this.$v.phone.$model,
                        createdAt = new Date(),
                        imagesList = this.imagesList

                    db.collection('cats').add({name, owner, phone, createdAt, imagesList})
                    this.$v.$reset()
                    this.showAlert = true
                    setTimeout(() => {
                        this.showAlert = false
                    }, 1500);
                }
            },
            addImage(image){
                this.imagesList.push(image)
            },
            deleteImage(image){
                storage.ref().child(image.path).delete().then(() => {
                    this.imagesList = this.imagesList.filter(item => {
                        return item != image;
                    })
                })
            }
        },
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: .7s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


</style>
