<template>
    <nav class="flex items-center justify-between bg-teal-500 px-6 absolute w-screen">
        <div class="flex items-center flex-shrink-0 text-white">
            <router-link to="/" class="font-semibold text-xl tracking-tight" active-class="">Calorie Basic</router-link>
        </div>
        <div class="text-sm">
            <div v-if="!loggedIn">
                <router-link class="text-teal-200 hover:text-white mr-4" to="/Login">Login</router-link>
                <router-link class="text-teal-200 hover:text-white" to="/Register">Register</router-link>
            </div>
            <div v-else>
                <span @click="open = !open" class="appearance-none flex items-center inline-block text-teal-200 hover:text-white cursor-pointer">
                    <span class="mr-1">{{userName}}</span>
                    <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </span>
                <div @click-outside="alert('hit')" v-show="open" class="absolute bg-white border rounded shadow overflow-hidden">
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
        signOut() {
            this.open = false;
            this.$store.dispatch('logout')
            .then(() => this.$router.push('welcome'));
        }
    }
}
</script>