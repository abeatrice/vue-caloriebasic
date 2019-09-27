<template>
  <div id="app">
    <NavTop />
    <div class="bg-teal-300 bg-repeat h-screen" :style="{backgroundImage: `url(${background})`}">
      <div class="container mx-auto pt-8 h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavTop from './components/nav/Top.vue';
import './assets/css/app.css';

export default {
  name: 'app',
  components: {
    NavTop
  },
  data() {
    return {
      background: ''
    }
  },
  created() {
    this.background = require('./assets/images/background2.svg');
  }
}
</script>