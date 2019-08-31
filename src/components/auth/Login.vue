<template>
    <div class="container mx-auto px-4 bg-teal-100 h-screen pt-6">
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input 
                    v-model="form.email" 
                    @keyup="error = ''"
                    :class="{'border-red-500':hasError}"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    ref="email" 
                    type="text" 
                    placeholder="name@example.com" 
                    required
                >
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input 
                    v-model="form.password"
                    @keyup="error = ''"
                    :class="{'border-red-500':hasError}"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    type="password" 
                    placeholder="*******" 
                    required
                >
                <p v-if="hasError" class="text-red-500 text-xs italic">Whoops! Try again...</p>
            </div>
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
            </button>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy; Calorie Basic. All rights reserved.
        </p>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'Login',
    data() {
        return {
            user: {},
            error: '',
            form: {
                "email": '',
                "password": '',
            }
        }
    },
    computed: {
        hasError() {
            return this.error !== '';
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:3000/users/login', this.form)
            .then(res => this.user = res.data.user)
            .catch(err => {
                this.error = err;
                this.$refs.email.focus();
            });
        }
    }
}
</script>