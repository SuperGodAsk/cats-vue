<template>
    <div>
        <div class="container main-wrapper">
            <div class="row justify-content-md-center">
                <div class="col-6">
                    <h3>Регистрация</h3>
                    <form>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Введите email"
                                    v-model="email"
                            />
                            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Пароль"
                                    v-model="password"
                            >
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="checkbox">
                            <label class="form-check-label" for="checkbox">Нажми на меня</label>
                        </div>
                        <div class="form-group">
                            <v-link href="/login" class="btn">Уже есть аккаунт?</v-link>
                        </div>
                        <button
                                type="submit"
                                class="btn btn-primary"
                                @click.prevent="signUp"
                        >Зарегистрироваться</button>
                        <transition name="fade">
                            <div class="alert alert-info" v-show="showAlert">
                                <button
                                        type="button"
                                        class="close"
                                        @click="showAlert = !showAlert"
                                >
                                    X
                                </button>
                                <h4>{{message}}</h4>
                            </div>
                        </transition>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VLink from "@/components/VLink"
    import firebase from 'firebase'

    export default {
        name: "SignUp",
        data() {
            return {
                email: '',
                password: '',
                showAlert: false,
                message: ''
            }
        },
        components: {VLink},
        methods: {
            signUp() {
                var vm = this
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    function (user) {
                        vm.message = 'Пользователь успешно создан.'
                        vm.showAlert = true
                    },
                    function (err) {
                        vm.message = 'Ошибка ' + err.message
                        vm.showAlert = true
                    }
                )
            }
        }
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
