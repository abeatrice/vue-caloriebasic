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
                        :disabled="loading"
                        @keyup="clearError('userName')"
                        :class="{ 'border-red-500': hasError('userName') }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="userName"
                        ref="userName" 
                        type="text" 
                        placeholder="calorieStar23" 
                        required
                    >
                    <p v-if="hasError('userName')" class="text-red-500 text-xs italic mt-1">{{errors.userName}}</p>
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-teal-900 text-sm font-bold mb-2">Email Address</label>
                    <input 
                        v-model="form.email" 
                        :disabled="loading"
                        @keyup="clearError('email')"
                        :class="{ 'border-red-500': hasError('email') }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        ref="email"
                        type="email" 
                        placeholder="janeDoe@example.com"
                        required
                    >
                    <p v-if="hasError('email')" class="text-red-500 text-xs italic mt-1">{{errors.email}}</p>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-teal-900 text-sm font-bold mb-2">Password</label>
                    <input 
                        v-model="form.password"
                        :disabled="loading"
                        @keyup="clearError('password')"
                        :class="{ 'border-red-500': hasError('password') }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password"
                        ref="password"
                        type="password"
                        placeholder="*******" 
                        required
                    >
                </div>
                <div class="mb-4">
                    <label for="passwordConfirm" class="block text-teal-900 text-sm font-bold mb-2">Confirm Password</label>
                    <input 
                        v-model="form.passwordConfirm"
                        :disabled="loading"
                        @keyup="clearError('passwordConfirm')"
                        :class="{ 'border-red-500': hasError('passwordConfirm') }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-teal-900 leading-tight focus:outline-none focus:shadow-outline" 
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
                    class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Register
                </button>
            </form>
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
                console.log(error);
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