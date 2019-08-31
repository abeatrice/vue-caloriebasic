<template>
  <div id="app">
    <NavTop />
    <router-view></router-view>
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