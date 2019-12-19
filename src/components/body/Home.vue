<template>
  <div>
    <NavTop class="mt-4"/>
    <div class="flex justify-center items-center">
      <div class="mt-12">
        <displayed-calories class="-mb-32" />
        <calorie-chart class="relative" />
        <inline-datepicker class="mt-5 mb-8" />
        <adjust-calories-buttons />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import NavTop from '../nav/Top.vue';
import CalorieChart from '../partials/CalorieChart.vue';
import DisplayedCalories from '../partials/DisplayedCalories.vue';
import InlineDatepicker from '../partials/InlineDatepicker.vue';
import AdjustCaloriesButtons from '../partials/AdjustCaloriesButtons.vue';

export default {
  name: 'Home',
  components: {
    NavTop,
    CalorieChart,
    DisplayedCalories,
    InlineDatepicker,
    AdjustCaloriesButtons
  },
  data() {
    return {}
  },
  mounted() {
    this.getCalories();
  },
  methods: {
    ...mapActions([
      'getCalories',
    ])
  }
}
</script>
