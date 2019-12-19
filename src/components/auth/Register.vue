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
                        :disabled="loading"
                        @keyup="clearError('userName')"
                        :class="{ 'border-red-500': hasError('userName') }"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        id="userName"
                        ref="userName" 
                        type="text" 
                        placeholder="calorieStar23" 
                        required
                    >
                    <p v-if="hasError('userName')" class="text-red-500 text-xs italic mt-1">{{errors.userName}}</p>
                </div>
                <div class="mb-4">
                    <label for="email" class="block font-semibold text-gray-500 text-sm mb-2">Email Address</label>
                    <input 
                        v-model="form.email" 
                        :disabled="loading"
                        @keyup="clearError('email')"
                        :class="{ 'border-red-500': hasError('email') }"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        ref="email"
                        type="email" 
                        placeholder="janeDoe@example.com"
                        required
                    >
                    <p v-if="hasError('email')" class="text-red-500 text-xs italic mt-1">{{errors.email}}</p>
                </div>
                <div class="mb-4">
                    <label for="password" class="block font-semibold text-gray-500 text-sm mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        :disabled="loading"
                        @keyup="clearError('password')"
                        :class="{ 'border-red-500': hasError('password') }"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password"
                        ref="password"
                        type="password"
                        placeholder="*******" 
                        required
                    >
                </div>
                <div class="mb-10">
                    <label for="passwordConfirm" class="block font-semibold text-gray-500 text-sm mb-2">Confirm Password</label>
                    <input 
                        v-model="form.passwordConfirm"
                        :disabled="loading"
                        @keyup="clearError('passwordConfirm')"
                        :class="{ 'border-red-500': hasError('passwordConfirm') }"
                        class="bg-transparent appearance-none border border-gray-500 w-full py-2 px-3 placeholder-gray-600 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
                        id="passwordConfirm"
                        ref="passwordConfirm"
                        type="password"
                        placeholder="*******" 
                        required
                    >
                    <p v-if="hasError('passwordConfirm')" class="text-red-500 text-xs italic mt-1">{{errors.passwordConfirm}}</p>
                </div>
                <button
                    :disabled="loading"
                    type="submit" 
                    class="w-full btn btn-primary"
                >
                    Sign up
                </button>
            </form>
        </div>
        <div class="flex justify-center">
            <span class="text-gray-500 mr-1">Have an account?</span> 
            <router-link to="Login" class="text-blue-500 hover:text-blue-400">Log in</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            loading: false,
            errors: {
                userName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            form: {
                userName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },
    computed: {
        year() {
            return new Date().getFullYear();
        }
    },
    mounted() {
        this.$refs.userName.focus();
    },
    methods: {
        hasError(field) {
            return this.errors[field] !== '';
        },
        clearError(field) {
            this.errors[field] = '';
        },
        onSubmit() {
            this.loading = true;
            if(this.formIsValid()) {
                this.$store.dispatch('register', this.form)
                .then(() => {
                    this.loading = false;
                    this.$router.push('home');
                })
                .catch(error => {
                    this.loading = false;
                    this.loadErrors(error.response.data);
                    this.form.password = '';
                    this.form.passwordConfirm = '';
                    this.$refs.password.focus();
                });
            }
        },
        loadErrors(errors) {
            if(errors.hasOwnProperty("errmsg") && errors.errmsg.includes("duplicate")) {
                if(errors.errmsg.includes("userName")) {
                    this.errors.userName = "This user name is taken!";
                }
                if(errors.errmsg.includes("email")) {
                    this.errors.email = "This email address is taken!";
                }
            }
            if(errors.errors.email !== undefined) { 
                this.errors.email = "This is not a valid email!";
            }
        },
        formIsValid() {
            for(let input of Object.entries(this.form)) {
                if(input[1].trim() === '') {
                    this.errors[input[0]] = 'All fields are required!';
                }

                if(input[0] == 'userName' && input[1].trim().includes(' ')) {
                    this.errors.userName = 'The user name cannot have a space!';
                }

            }

            if (this.form.password !== this.form.passwordConfirm) {
                this.errors.passwordConfirm = 'The passwords do not match!';
            }

            for(let error of Object.entries(this.errors)) {
                if(error[1] !== '') {
                    this.form.password = '';
                    this.form.passwordConfirm = '';
                    this.loading = false;
                    this.$refs.userName.focus();
                    return false;
                }
            }

            return true;
        }
    }
}
</script>