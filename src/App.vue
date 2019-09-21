<template>
  <div id="app">
    <NavTop />
    <div class="container mx-auto bg-teal-200 h-screen pt-6">
      <router-view></router-view>
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