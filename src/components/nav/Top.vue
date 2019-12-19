<template>
    <nav class="flex items-center justify-between px-6 py-1">
        <div class="flex items-center flex-shrink-0 text-blue-400">
            <router-link to="/" class="font-semibold text-xl tracking-tight" active-class="">
                <div class="flex items-center">
                    <svg class="fill-current h-5 w-5" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g transform="translate(0,-273)">
                            <path d="m 12.00067,297 c 3.35389,0 6.36572,-1.36999 8.52171,-3.54385 C 22.67838,291.28228 24,288.29592 24,285 24,281.70408 22.67838,278.71771 20.52238,276.54384 18.36639,274.36998 15.35456,272.99999 12.00067,273 8.64679,273 5.63496,274.36998 3.47896,276.54384 1.32296,278.71771 0,281.70408 0,285 c 0,3.29592 1.32296,6.28228 3.47896,8.45615 C 5.63496,295.63001 8.64679,297 12.00067,297 Z m 0.25787,-11.1833 c -3.12633,0 -6.24016,9.56662 -8.33085,7.4586 -2.0907,-2.10803 -3.39517,-5.03728 -3.39517,-8.2753 0,-3.23802 1.30447,-6.16728 3.39517,-8.2753 2.09069,-2.10803 4.94664,-3.38539 8.07298,-3.38539 3.12635,0 5.98094,1.27736 8.07164,3.38539 2.09069,2.10802 0.5585,1.42233 0.5585,4.66035 0,3.23802 0.2428,6.33159 -1.84789,8.43961 -2.0907,2.10802 -3.39803,-4.00796 -6.52438,-4.00796 z"/>
                        </g>
                    </svg>
                    <span class="ml-2">Calorie Basic</span>
                </div>
            </router-link>
        </div>
        <div class="text-sm">
            <span id="dropdown" class="flex items-center text-blue-400">
                <span class="mr-3">{{userName}}</span>
                <svg @click="open = !open" class="h-4 w-4 fill-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path v-if="!open" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    <path v-else d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
            </span>
            <div v-show="open" class="absolute bg-gray-600 border-none border rounded shadow overflow-hidden">
                <a @click="signOut" class="no-underline block px-2 py-1 font-bold text-gray-800 cursor-pointer">Sign Out</a>
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
            this.$store.dispatch('resetInitialState');
            await this.$store.dispatch('logout')
            .then(() => this.$router.push('/Login'));
        },
        closeIfClickedOutside(event) {
            if(! event.target.closest('#dropdown')) {
                this.open = false;
                document.removeEventListener('click', this.closeIfClickedOutside);
            }
        }
    },
    watch: {
        open(isOpen) {
            if(isOpen) {
                document.addEventListener('click', this.closeIfClickedOutside);
            }
        }
    }
}
</script>