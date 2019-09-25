<template>
  <div id="app">
    <NavTop />
    <div class="bg-teal-200 bg-repeat h-screen" :style="{backgroundImage: `url(${background})`}">
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
  },
  computed: {
    background() {
      return require('./assets/images/background.svg');
    }
  }
}
</script>