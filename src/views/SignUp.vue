<template>
    <v-layout fill-height justify-center align-center>
        <v-flex xs8>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Регистрация</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="person" v-model="email" label="Email" type="text"></v-text-field>
                        <v-text-field id="password" prepend-icon="lock" v-model="password" label="Пароль"
                                      type="password"></v-text-field>
                    </v-form>
                    <p mt-4>Есть аккаунт? <v-btn flat small color="primary" to="/login">Авторизация</v-btn></p>
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
                    <v-btn color="primary" @click.prevent="signUp">Регистрация</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "SignUp",
        data() {
            return {
                email: '',
                password: '',
                showAlert: false,
                alertType: 'success',
                message: ''
            }
        },
        methods: {
            signUp() {
                var vm = this
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    function (user) {
                        vm.message = 'Пользователь успешно создан.'
                        vm.showAlert = true
                        vm.alertType = 'success'
                    },
                    function (err) {
                        vm.message = 'Ошибка ' + err.message
                        vm.showAlert = true
                        vm.alertType = 'error'
                    }
                )
            }
        }
    }
</script>
