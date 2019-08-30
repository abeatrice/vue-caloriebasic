<template>
  <div id="app">
    <NavTop />
    <div class="container mx-auto px-6 mt-6">
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