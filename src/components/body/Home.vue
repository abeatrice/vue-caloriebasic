<template>
  <div>
    <div class="text-md text-center font-semibold bg-teal-500 text-white border rounded-lg rounded-b-none">
      {{selectedDateForHumans}}
    </div>  
    <div class="text-6xl text-center font-semibold bg-white border rounded-lg rounded-t-none">
      {{calories.quantity}}
    </div>
    <datepicker
      @selected="updateSelectedDate"
      :value="selectedDate"
      :inline="true"
    />
    <adjust-calories-buttons />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import Datepicker from 'vuejs-datepicker';
import AdjustCaloriesButtons from '../partials/AdjustCaloriesButtons.vue'

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
      'adjustCalories'
    ])
  }
}
</script>
