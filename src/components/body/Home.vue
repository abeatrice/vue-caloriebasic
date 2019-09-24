<template>
  <div class="flex justify-center items-center h-full">
    <div>
      <div class="mb-3 shadow rounded">
        <div class="py-1 text-md text-center font-semibold tracking-wide bg-teal-500 text-teal-100 rounded-t">
          {{selectedDateForHumans}}
        </div>  
        <div class="bg-white text-6xl text-teal-900 text-center font-semibold bg-white rounded-b">
          {{calories.quantity}}
        </div>
      </div>
      <div class="py-1 text-md text-center font-semibold bg-teal-500 text-teal-100 rounded-t">
          <div class="flex justify-around items-center">
            <svg @click="selectPrevDay" class="fill-current text-teal-900 hover:text-teal-700 cursor-pointer h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/>
            </svg>
            <div @click="updateSelectedDate(new Date())" class="text-teal-900 hover:text-teal-700 cursor-pointer px-2 rounded uppercase font-bold tracking-wide">
              Today
            </div> 
            <svg @click="selectNextDay" class="fill-current text-teal-900 hover:text-teal-700 cursor-pointer h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
            </svg>
          </div>
        </div>  
      <datepicker
        @selected="updateSelectedDate"
        :value="selectedDate"
        :inline="true"
        class="shadow"
      />
      <adjust-calories-buttons class="mt-3 rounded shadow" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import Datepicker from 'vuejs-datepicker';
import AdjustCaloriesButtons from '../partials/AdjustCaloriesButtons.vue';

export default {
  name: 'Home',
  components: {
    Datepicker,
    AdjustCaloriesButtons
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
        'calories',
        'selectedDate',
        'selectedDateForHumans'
    ])
  },
  mounted() {
    this.getCalories();
  },
  methods: {
    ...mapActions([
      'getCalories',
      'updateSelectedDate',
      'adjustCalories',
      'selectPrevDay',
      'selectNextDay'
    ])
  }
}
</script>
