<template>
  <div class="h-full flex flex-wrap justify-center content-center">
    <div class="px-4 md:px-10 text-center bg-white rounded py-12 rounded shadow-md">
      <h1 class="text-teal-900 text-5xl font-bold leading-tight">Calorie Basic</h1>
      <h1 class="text-teal-700 text-sm">Tracking calories should be fast, simple, and easy.</h1>
      <div class="pt-5 flex justify-center">
        <router-link class="btn bg-indigo-500 hover:bg-indigo-700 text-white shadow-md mr-5" to="/Register">Try it out!</router-link>
        <router-link class="btn bg-teal-500 hover:bg-teal-700 text-white shadow-md" to="/Login">Login</router-link>      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>
