<template>
    <div class="h-full flex flex-wrap justify-center items-center">
        <div class="w-3/4 md:w-1/2">
            <div class="py-1 text-md text-center font-semibold tracking-wide bg-teal-500 text-teal-100 rounded-t">
                Let's get started!
            </div>
            <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded-b px-8 pt-6 pb-8">
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
                <div class="mb-4">
                    <label for="email" class="block text-teal-900 text-sm font-bold mb-2">Email Address</label>
                    <input 
                        v-model="form.email" 
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        ref="email" 
                        type="email" 
                        placeholder="janeDoe@example.com" 
                        required
                    >
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-teal-900 text-sm font-bold mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password"
                        ref="password"
                        type="password"
                        placeholder="*******" 
                        required
                    >
                </div>
                <div class="mb-4">
                    <label for="password-confirm" class="block text-teal-900 text-sm font-bold mb-2">Confirm Password</label>
                    <input 
                        v-model="form.passwordConfirm"
                        @keyup="clearError"
                        :class="{'border-red-500':hasError}"
                        :disabled="loading"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password-confirm"
                        ref="password-confirm"
                        type="password" 
                        placeholder="*******" 
                        required
                    >
                </div>
                <p v-if="hasError" class="text-red-500 text-xs italic mb-4">{{error}}</p>
                <button
                    :disabled="loading"
                    type="submit" 
                    class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Register
                </button>
            </form>
            <p class="text-center text-gray-500 text-xs mt-3">
                &copy; {{year}} Calorie Basic. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            loading: false,
            error: '',
            form: {
                userName: '',
                email: '',
                password: '',
                passwordConfirm: ''
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
            if(this.validateForm()) {
                this.$store.dispatch('register', this.form)
                .then(() => {
                    this.loading = false;
                    this.$router.push('home');
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error;
                    this.form.password = '';
                    this.form.passwordConfirm = '';
                    this.$refs.password.focus();
                });
            }
        },
        validateForm() {
            for(let input of Object.entries(this.form)) {
                if(input[1].trim() === '') {
                    this.error = 'All Inputs are required!';
                    this.loading = false;
                    this.$refs.userName.focus();
                    return false;
                }
            }
            if(this.form.userName.trim().includes(' ')) {
                this.error = 'The user name cannot have a space!';
                this.loading = false;
                this.$refs.userName.focus();
                return false;
            }
            if (this.form.password !== this.form.passwordConfirm) {
                this.error = 'The passwords do not match!';
                this.loading = false;
                this.form.password = '';
                this.form.passwordConfirm = '';
                this.$refs.password.focus();
                return false;
            }
            return true;
        }
    }
}
</script>