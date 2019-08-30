//auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//body
import Welcome from './components/body/Welcome';
import Home from './components/body/Home';
import Profile from './components/body/Profile';

export default {
    mode: 'history',
    linkActiveClass: 'font-bold',
    routes: [{
        path: '/',
        component: Welcome
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
