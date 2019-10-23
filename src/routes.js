import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Welcome from './components/body/Welcome';
import Home from './components/body/Home';
import Profile from './components/body/Profile';
import store from './store';

export default {
    mode: 'history',
    linkActiveClass: 'font-semibold',
    routes: [{
        path: '/',
        component: Welcome,
        meta: {
            title: "Where Calorie Tracking is Easy | Calorie Basic"
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
        path: '/Register',
        component: Register,
        meta: {
            title: "Register | Calorie Basic"
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
        path: '/Profile',
        component: Profile,
        meta: {
            title: "Profile | Calorie Basic"
        }
    }, {
        path: '*',
        redirect: '/'
    }
]};
