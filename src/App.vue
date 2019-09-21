<template>
  <div id="app">
    <NavTop />
    <div class="bg-teal-200 h-screen">
      <div class="container mx-auto pt-8 h-full">
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