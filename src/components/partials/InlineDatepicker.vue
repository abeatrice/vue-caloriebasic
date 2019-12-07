<template>
  <datepicker
    @selected="updateSelectedDate"
    :value="selectedDate"
    :inline="true"
    class="text-gray-300"
  />
</template>

<style>
  .vdp-datepicker__calendar {
    background-color: transparent !important;
    border: none !important;
  }
  .selected {
    background-color: #2c5282 !important;
  }
  .month__year_btn {
    background-color: transparent !important;
  }
  .day__month_btn {
    background-color: transparent !important;
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
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'InlineDatepicker',
  components: {
    Datepicker,
  },
  computed: {
    ...mapGetters([
      'selectedDate',
    ])
  },
  methods: {
    ...mapActions([
      'updateSelectedDate',
    ])
  }
}
</script>
