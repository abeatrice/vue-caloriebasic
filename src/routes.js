import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/body/Home';
import store from './store';

export default {
    mode: 'history',
    linkActiveClass: 'font-semibold',
    routes: [{
        path: '/',
        component: Register,
        meta: {
            title: "Register | Calorie Basic"
        },
        beforeEnter: (to, from, next) => {
            if(store.getters.loggedIn) {
                next('/Home');
            } else {
                next();
            }
        }
    }, {
        path: '/Login',
        component: Login,
        meta: {
            title: "Login | Calorie Basic"
        }
    }, {
        path: '/Home',
        component: Home,
        meta: {
            title: "Where Calorie Tracking is Easy | Calorie Basic"
        },
        beforeEnter: (to, from, next) => {
            if(! store.getters.loggedIn) {
                next('/Login');
            }
            next();
        }
    }, {
        path: '*',
        redirect: '/'
    }
]};
