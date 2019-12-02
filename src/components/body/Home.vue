<template>
  <div>
    <NavTop class="mt-3" />
    <div class="flex justify-center items-center">
      <div class="mt-16">
        <div class="mb-10">
          <div class="text-6xl text-gray-500 text-center font-semibold leading-none">
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
          class="opacity-50 mb-10"
        />
        <adjust-calories-buttons class="mt-3" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import Datepicker from 'vuejs-datepicker';
import NavTop from '../nav/Top.vue';
import AdjustCaloriesButtons from '../partials/AdjustCaloriesButtons.vue';

export default {
  name: 'Home',
  components: {
    Datepicker,
    NavTop,
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
