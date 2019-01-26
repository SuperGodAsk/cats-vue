import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            title: 'Главная',
            mdIcon: 'home'
        },
        {
            path: '/cats',
            name: 'cats',
            title: 'Список котиков',
            mdIcon: 'list',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Cats.vue')
        },
        {
            path: '/cats/add',
            name: 'cats-add',
            title: 'Добавить котика',
            mdIcon: 'add',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/CatsAdd.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            title: 'Авторизация',
            mdIcon: 'person',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            title: 'Регистрация',
            mdIcon: 'person_add',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue')
        },

    ]
})

router.beforeEach((to,from,next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !currentUser) {
        next('login')
    }
    else {
        next()
    }
})

export default router;
