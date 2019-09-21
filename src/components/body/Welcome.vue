<template>
  <div class="h-full flex flex-wrap justify-center content-center">
    <div class="px-6 text-center">
      <h1 class="text-teal-900 text-5xl font-bold">Calorie Basic</h1>
      <h1 class="text-teal-800 text-md">Tracking calories should be fast, simple, and easy.</h1>
      <div class="pt-5 flex justify-center">
        <router-link class="btn bg-teal-500 hover:bg-teal-700 text-white mr-5" to="/Register">Register</router-link>
        <router-link class="btn bg-indigo-500 hover:bg-indigo-700 text-white" to="/Login">Login</router-link>      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>
