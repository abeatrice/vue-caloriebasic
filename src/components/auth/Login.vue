<template>
    <div class="flex flex-col">
        <div class="flex justify-center text-6xl text-blue-400 mt-16 leading-none mb-2">
            Calorie Basic
        </div>
        <div class="flex justify-center text-gray-500 mb-4">
            Tracking calories should be fast, simple, and easy.
        </div>
        <div class="flex justify-center mb-10">
            <div class="border-b-2 border-gray-700 w-3/5"></div>
        </div>
        <div class="flex justify-center mb-10">
            <form @submit.prevent="onSubmit" class="w-3/4">
                <div class="mb-4">
                    <label for="email" class="block font-semibold text-gray-500 text-sm mb-2">User Name</label>
                    <input 
                        v-model="form.userName" 
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        id="userName"
                        ref="userName" 
                        type="userName" 
                        placeholder="calorieStar23" 
                        required
                    >
                </div>
                <div class="mb-6">
                    <label for="password" class="block font-semibold text-gray-500 text-sm mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password"
                        ref="password"
                        type="password" 
                        placeholder="*******" 
                        required
                    >
                    <p v-if="hasError" class="text-red-500 text-xs italic">Whoops! Try again...</p>
                </div>
                <button
                    :disabled="loading"
                    type="submit" 
                    class="w-full btn btn-primary"
                >
                    Log In
                </button>
            </form>
        </div>
        <div class="flex justify-center">
            <span class="text-gray-500 mr-1">Don't have an account?</span> 
            <router-link to="/" class="text-blue-500 hover:text-blue-400">Sign up</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loading: false,
            error: '',
            form: {
                "userName": '',
                "password": '',
            }
        }
    },
    computed: {
        hasError() {
            return this.error !== '';
        },
        year() {
            return new Date().getFullYear();
        }
    },
    mounted() {
        this.$refs.userName.focus();
    },
    methods: {
        clearError() {
            this.error = '';
        },
        onSubmit() {
            this.loading = true;
            this.$store.dispatch('login', this.form)
            .then(() => {
                this.loading = false;
                this.$router.push('home');
            })
            .catch(error => {
                this.loading = false;
                this.error = error.response.data.error;
                this.form.password = '';
            });
        }
    }
}
</script>