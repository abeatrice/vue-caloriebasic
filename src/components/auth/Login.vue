<template>
    <div class="h-full flex flex-wrap justify-center content-center">
        <div class="w-3/4 md:w-2/5">
            <div class="py-1 text-md text-center font-semibold tracking-wide bg-teal-500 text-teal-100 rounded-t">
                Welcome Back!
            </div>
            <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div class="mb-4">
                    <label for="email" class="block text-teal-900 text-sm font-bold mb-2">User Name</label>
                    <input 
                        v-model="form.userName" 
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="userName"
                        ref="userName" 
                        type="userName" 
                        placeholder="calorieStar23" 
                        required
                    >
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-teal-900 text-sm font-bold mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
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
                    class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
            </form>
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