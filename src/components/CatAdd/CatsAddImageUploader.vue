<template>
    <div class="form-row">
        <div class="form-group col-12">
            <label for="catImage" class="col-12">Загрузите фото</label>
            <div
                    class="col-12 dropbox upload-list"
                    :class="{ 'is-dragover' : inputFile.drag, 'active' : imagesList.length }">
                <div
                        class="upload-list__image img-thumbnail"
                        v-for="(image,idx) in imagesList"
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
</template>

<script>
    import {db, storage} from '@/main'

    export default {
        name: "CatsAddImageUploader",
        props:{
            imagesList: Array
        },
        data(){
            return {
                inputFile: {
                    drag: false,
                },
                uploadTask: [],
                bufferedFiles: [],
            }
        },
        methods: {
            detectFiles(fileList) {
                Array.from(Array(fileList.length).keys()).map(x => {
                    var vm = this
                    var imagePath = this.upload(fileList[x], x)
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
                                let image = {
                                    name: element.snapshot.ref.name,
                                    url: downloadUrl,
                                    path: imagePath
                                }
                                this.$emit('addImage', image)
                                vm.bufferedFiles[x].show = false;
                            })
                        })
                })

            },
            upload(file, x) {
                const date = new Date(),
                    subPath = String(date.getDay()) + String(date.getMonth()) + String(date.getFullYear()) + '/' + String(date.getTime()) + file.name
                var task = storage.ref('images/' + subPath).put(file)
                this.uploadTask[x] = task // Создаем массив заданий на асинхронную загрузку файлов
                return 'images/' + subPath;
            },
            deleteBufferFile(file) {
                this.bufferedFiles = this.bufferedFiles.filter(item => {
                    return item != file;
                })
            },
            deleteUploadFile(image) {
                this.$emit('deleteImage', image)
            }
        }
    }
</script>

<style scoped>
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
