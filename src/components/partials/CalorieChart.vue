<template>
  <canvas id="calorieChart"></canvas>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Chart from 'chart.js';

export default {
  name: 'CalorieChart',
  data() {
    return {
      ctx: null,
      chart: null,
      weekCalories: [
        1820,
        1980,
        1545,
      ],
    }
  },
  computed: {
    ...mapGetters([
      'calories',
    ])
  },
  mounted() {
    this.ctx = document.getElementById('calorieChart').getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', '',''],
        datasets: [{
            minBarLength: 2,
            data: [2650, 1950, 2650, 0, 2105, 1860, 1920],
            backgroundColor: [
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
                'rgba(44, 82, 130, 1)',
            ]
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
              gridLines: {
                  display: false
              }
            }],
            yAxes: [{
              gridLines: {
                  display: false
              }
            }]
        }
      }
    });
  },
  methods: {
    ...mapActions([
      'getCalories',
    ])
  }
}
</script>
