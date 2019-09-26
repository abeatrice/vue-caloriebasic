<template>
    <nav class="flex items-center justify-between bg-teal-500 px-6 py-1 absolute w-screen shadow">
        <div class="flex items-center flex-shrink-0 text-teal-100">
            <router-link to="/" class="font-semibold text-xl tracking-tight" active-class="">Calorie Basic</router-link>
        </div>
        <div class="text-sm">
            <div v-if="!loggedIn">
                <router-link class="text-teal-200 hover:text-teal-100" to="/Register">Register</router-link>
                <router-link class="text-teal-200 hover:text-teal-100 ml-4" to="/Login">Login</router-link>
            </div>
            <div v-else>
                <span class="flex items-center text-teal-200">
                    <span class="mr-3">{{userName}}</span>
                    <svg @click="open = !open" class="h-4 w-4 fill-current hover:text-teal-100 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path v-if="!open" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        <path v-else d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                    </svg>
                </span>
                <div v-show="open" class="absolute bg-white border rounded shadow overflow-hidden">
                    <a @click="signOut" class="no-underline block px-2 py-1 text-gray-800 hover:text-gray-600 cursor-pointer">Sign Out</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'Top',
    data() {
        return {
            open: false
        }
    },
    computed: {
        ...mapGetters([
            'loggedIn',
            'userName'
        ])
    },
    methods: {
        async signOut() {
            this.open = false;
            await this.$store.dispatch('logout')
            .then(() => this.$router.push('/'));
        }
    }
}
</script>