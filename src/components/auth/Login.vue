<template>
    <div class="w-full max-w-xs mx-auto">
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="name@example.com">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-bold bm-2">Password</label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            errors: []
        }
    },
    methods: {
        login() {
            alert('hit');
        }
    }
}
</script>