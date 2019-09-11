import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Welcome from './components/body/Welcome';
import Home from './components/body/Home';
import Profile from './components/body/Profile';
import store from './store';

export default {
    mode: 'history',
    linkActiveClass: 'font-bold',
    routes: [{
        path: '/',
        component: Welcome,
        beforeEnter: (to, from, next) => {
            if(store.getters.loggedIn) {
                next('/Home');
            } else {
                next('/Welcome');
            }
        }
    }, {
        path: '/Login',
        component: Login
    }, {
        path: '/Register',
        component: Register
    }, {
        path: '/Home',
        component: Home
    }, {
        path: '/Profile',
        component: Profile
    }
]};
