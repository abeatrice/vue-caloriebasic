<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import './assets/css/app.css';

export default {
  name: 'app'
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: .5;
  }
</style>