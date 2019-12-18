<template>
  <div>
      <div class="flex justify-center align-center mb-2">
        <div @click="adjustCalories(10)" class="btn btn-primary font-bold mx-1">10</div>
        <div @click="adjustCalories(50)" class="btn btn-primary font-bold mx-1">50</div>
        <div @click="adjustCalories(100)" class="btn btn-primary font-bold mx-1">100</div>
        <div @click="adjustCalories(250)" class="btn btn-primary font-bold mx-1">250</div>
      </div>
      <div class="flex justify-center align-center">
        <div @click="adjustCalories(-10)" class="btn btn-secondary mx-1">10</div>
        <div @click="adjustCalories(-50)" class="btn btn-secondary mx-1">50</div>
        <div @click="adjustCalories(-100)" class="btn btn-secondary mx-1">100</div>
        <div @click="adjustCalories(-250)" class="btn btn-secondary mx-1">250</div>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'AdjustCaloriesButtons',
  methods: {
    ...mapActions([
      'adjustCalories'
    ])
  }
}
</script>
