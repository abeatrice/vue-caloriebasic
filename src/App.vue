<template>
  <div id="app">
    <NavTop />
    <div class="bg-teal-300 bg-repeat h-screen" :style="{backgroundImage: `url(${background})`}">
      <div class="container mx-auto pt-8 h-full">
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavTop from './components/nav/Top.vue';
import Footer from './components/nav/Footer.vue';
import './assets/css/app.css';

export default {
  name: 'app',
  components: {
    NavTop,
    Footer
  },
  data() {
    return {
      background: ''
    }
  },
  created() {
    this.background = require('./assets/images/background.svg');
  }
}
</script>