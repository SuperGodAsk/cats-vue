<template>
    <v-layout fill-height justify-center align-center>
        <v-flex xs8>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Авторизация</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person" v-model="email" label="Email" type="text"></v-text-field>
                        <v-text-field id="password" prepend-icon="lock" v-model="password" label="Пароль"
                                      type="password"></v-text-field>
                    </v-form>
                    <p mt-4>Нет аккаунта? <v-btn flat small color="primary" to="/signup">Регистрация</v-btn></p>
                    <v-alert
                            v-model="showAlert"
                            dismissible
                            :type="alertType"
                    >
                        {{message}}
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.prevent="login">Авторизоваться</v-btn>
                    <v-btn color="error" @click.prevent="logout">Выйти</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                showAlert: false,
                alertType: '',
                message: ''
            }
        },
        methods: {
            login() {
                var vm = this
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    function (user) {
                        vm.message = 'Авторизация успешна.'
                        vm.showAlert = true
                        vm.alertType = 'success'
                        vm.$store.commit('setUserInfo', firebase.auth().currentUser)
                    },
                    function (err) {
                        vm.message = 'Ошибка ' + err.message
                        vm.alertType = 'error'
                        vm.showAlert = true
                    }
                )
            },
            logout() {
                var vm = this
                firebase.auth().signOut().then(() => {
                    vm.$store.commit('setUserInfo', '')
                    vm.message = 'Вы вышли из своего аккаунта'
                    vm.showAlert = true
                    vm.email = ''
                    vm.password = ''
                })
            }
        }
    }
</script>
