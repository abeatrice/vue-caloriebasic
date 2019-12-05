<template>
  <div>
    <NavTop class="mt-4"/>
    <div class="flex justify-center items-center">
      <div class="mt-12">
        <CalorieChart />
        <div class="mb-10">
          <div class="text-6xl text-gray-500 text-center font-semibold leading-none mb-1">
            {{calories.quantity}}
          </div>
          <div class="text-md text-center font-semibold tracking-wide text-gray-500">
            {{selectedDateForHumans}}
          </div>
        </div>
        <datepicker
          @selected="updateSelectedDate"
          :value="selectedDate"
          :inline="true"
          class="mb-10 text-gray-500"
        />
        <adjust-calories-buttons class="mt-3" />
      </div>
    </div>
  </div>
</template>

<style>
  .vdp-datepicker__calendar {
    background-color: transparent !important;
    border: none !important;
  }
  .selected {
    background-color: #2c5282 !important;
  }
  .prev {
    background-color: transparent !important;
  }
  .next {
    background-color: transparent !important;
  }
</style>

<script>
import {mapGetters, mapActions} from 'vuex';
import NavTop from '../nav/Top.vue';
import Datepicker from 'vuejs-datepicker';
import AdjustCaloriesButtons from '../partials/AdjustCaloriesButtons.vue';
import CalorieChart from '../partials/CalorieChart.vue';

export default {
  name: 'Home',
  components: {
    NavTop,
    CalorieChart,
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
