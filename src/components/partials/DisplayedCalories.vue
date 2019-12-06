<template>
  <div>
    <div class="text-6xl text-gray-500 text-center font-semibold leading-none">
      {{calories.quantity}}
    </div>
    <div class="text-md text-center font-semibold tracking-wide text-gray-500">
      {{selectedDateForHumans}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'DisplayedCalories',
  computed: {
    ...mapGetters([
      'calories',
      'selectedDateForHumans'
    ])
  }
}
</script>
