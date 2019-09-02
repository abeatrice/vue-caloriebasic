<template>
  <div id="app">
    <div class="bg-teal-100 h-screen w-full">
      <NavTop />
      <div class="container h-full pt-6 px4 mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavTop from './components/nav/Top.vue'
import './assets/css/app.css'

export default {
  name: 'app',
  components: {
    NavTop
  }
}
</script>