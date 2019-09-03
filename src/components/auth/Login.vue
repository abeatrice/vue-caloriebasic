<template>
    <div class="h-full flex justify-center items-center">
        <div class="w-3/4 md:w-1/2">
            <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input 
                        v-model="form.email" 
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        ref="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        required
                    >
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
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
                    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy; Calorie Basic. All rights reserved.
            </p>
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
                this.$refs.password.focus();
            });
        }
    }
}
</script>