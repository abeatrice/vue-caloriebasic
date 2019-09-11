<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-3/4 md:w-1/2">    
      <div class="flex justify-center align-center">
        <div @click="selectPrevDay" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">prev</div>
        <h1 class="align-middle text-center text-xl font-semibold mx-5">{{calories[selectedIndex]._id.date}}</h1>
        <div @click="selectNextDay" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">next</div>
      </div>
      <p class="text-center text-xl font-semibold">
        {{calories[selectedIndex].quantity}}
      </p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
        'calories',
        'selectedIndex'
    ])
  },
  mounted() {
    this.getCalories();
  },
  methods: {
    ...mapActions([
      'getCalories',
      'selectPrevDay',
      'selectNextDay'
    ])
  }
}
</script>
