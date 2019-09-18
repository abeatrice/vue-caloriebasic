<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-3/4 md:w-1/2">    
      <div class="flex justify-center align-center">
        <datepicker 
          @selected="updateSelectedDate"
          :value="selectedDate"
          :inline="true"
        />
      </div>
      <p class="text-center text-xl font-semibold my-5">
        {{calories.quantity}}
      </p>
      <div class="flex justify-center align-center mb-2">
        <div @click="adjustCalories(10)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">10</div>
        <div @click="adjustCalories(25)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">25</div>
        <div @click="adjustCalories(100)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">100</div>
        <div @click="adjustCalories(250)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">250</div>
      </div>
      <div class="flex justify-center align-center mb-2">
        <div @click="adjustCalories(-10)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">10</div>
        <div @click="adjustCalories(-25)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">25</div>
        <div @click="adjustCalories(-100)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">100</div>
        <div @click="adjustCalories(-250)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline cursor-pointer">250</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'Home',
  components: {
    Datepicker
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
        'calories',
        'selectedDate'
    ])
  },
  mounted() {
    this.getCalories();
  },
  methods: {
    ...mapActions([
      'getCalories',
      'updateSelectedDate',
      'adjustCalories'
    ])
  }
}
</script>
