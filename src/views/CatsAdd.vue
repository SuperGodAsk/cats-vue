<template>
    <div>
        <div class="container main-wrapper">
            <h1>Добавление котика</h1>
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
                <div class="form-row">
                    <div class="form-group col-12">

                        <label for="catImage" class="col-12">Загрузите фото</label>
                        <div
                                class="col-12 dropbox upload-list"
                                :class="{ 'is-dragover' : inputFile.drag, 'active' : uploadFiles.length }">
                            <div
                                    class="upload-list__image img-thumbnail"
                                    v-for="(image,idx) in uploadFiles"
                                    :key="idx"
                            >
                                    <img
                                            class="rounded"
                                            :src="image.url"
                                            :alt="image.name"
                                            :title="image.name"
                                    >
                                <button type="button" class="close upload-item__delete-button"
                                        @click.prevent="deleteUploadFile(image)" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>

                            <input
                                    type="file"
                                    id="catImage"
                                    @change="detectFiles($event.target.files)"
                                    accept="image/*"
                                    class="input-file"
                                    multiple
                                    @dragover.prevent.stop="inputFile.drag = true"
                                    @dargenter.prevent.stop="inputFile.drag = true"
                                    @dragleave.prevent.stop="inputFile.drag = false"
                                    @dragend.prevent.stop="inputFile.drag = false"
                                    @drop.prevent.stop="inputFile.drag = false, detectFiles($event.dataTransfer.files)"
                            >
                        </div>
                        <div class="alert alert-success mb-1"
                             role="alert"
                             v-for="(file,idx) in bufferedFiles"
                             v-if="file.show"
                             :key="idx">
                            <h4 class="alert-heading">{{file.name}}</h4>
                            <button type="button" class="close loader-item__delete-button"
                                    @click.prevent="deleteBufferFile(file)" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <hr>
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                                 role="progressbar"
                                 :aria-valuenow="file.progress"
                                 aria-valuemin="0"
                                 aria-valuemax="100"
                                 :style="{ width: file.progress + '%'}"
                            > {{file.progress}}
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
                        <div v-for="(cat,idx) in cats" :key="idx"
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
        </div>
    </div>
</template>

<script>
    import {db, storage} from '../main'
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
                inputFile: {
                    drag: false,

                },
                uploadTask: [],
                bufferedFiles: [],
                uploadFiles: [],
                submitStatus: null,
                showAlert: false,
                testdel: '',
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
            detectFiles(fileList) {
                Array.from(Array(fileList.length).keys()).map(x => {
                    var vm = this
                    this.upload(fileList[x], x)
                    var element = this.uploadTask[x]
                    vm.bufferedFiles[x] = { // Собираем массив файлов в процессе загрузки
                        name: element.snapshot.ref.name,
                        progress: 0,
                        show: true,
                    }
                    element.on('state_changed', sp => { // Отслеживем загрузку
                            this.bufferedFiles[x].progress = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                        },
                        null, // Обработчик ошибок
                        () => { // Конец загрузки
                            element.snapshot.ref.getDownloadURL().then(downloadUrl => {
                                vm.uploadFiles.push({ // Обновляем массив загруженных файлов
                                    name: element.snapshot.ref.name,
                                    url: downloadUrl
                                })
                                vm.bufferedFiles[x].show = false;
                            })
                        })
                })

            },
            upload(file, x) {
                const date = new Date(),
                    subPath = String(date.getDay()) + String(date.getMonth()) + String(date.getFullYear()) + '/' + file.name
                var task = storage.ref('images/' + subPath).put(file)
                this.uploadTask[x] = task // Создаем массив заданий на асинхронную загрузку файлов
            },
            deleteBufferFile(file) {
                this.bufferedFiles = this.bufferedFiles.filter(item => {
                    return item != file;
                })
            },
            deleteUploadFile(file) {
                this.uploadFiles = this.uploadFiles.filter(item => {
                    return item != file;
                })
            }
        },
        watch: {
            uploadTask: function () {
                // console.log(this.uploadTask)
                // let position = this.uploadFiles.push({
                //     name: this.uploadTask.snapshot.ref.name,
                //     progress: 0,
                //     url: null
                // }) - 1;
                // this.uploadTask.on('state_changed', sp => {
                //         this.uploadFiles[position].progress = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                //     },
                //     null,
                //     () => {
                //         this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                //             this.$emit('url', downloadURL)
                //             this.uploadFiles[position].url = downloadURL
                //         })
                //     })
            }
        }
    }
</script>

<style scoped lang="scss">

    .cats-list {
        margin-top: 2rem;
    }

    .main-wrapper {
        padding-top: calc(6rem + 106px);
        padding-bottom: 6rem;
    }

    .fade-enter-active, .fade-leave-active {
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

    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 220px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .dropbox::after {
        content: "\f15b";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 6rem;
        opacity: 0.8;
        transition: .3s;
        poiter-events: none;
    }

    .dropbox.is-dragover::after,
    .dropbox.active::after {
        opacity: 0;
    }

    .dropbox.is-dragover, .dropbox:hover {
        background: lightblue;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        cursor: pointer;
    }

    .upload-list {
        display: flex;
        flex-flow: row wrap;
    }

    .upload-list__image {
        width: calc(20% - 10px);
        margin: 5px;
        box-sizing: border-box;
        height: 200px;
        position: relative;
        overflow: hidden;
        z-index: 3;
    }

    .upload-list__image img {
        min-width: 80%;
        max-width: calc(100% - 10px);
        max-height: calc(100% - 10px);
        min-height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .loader-item__delete-button {
        position: absolute;
        right: 3%;
        top: 20%;
    }
</style>
