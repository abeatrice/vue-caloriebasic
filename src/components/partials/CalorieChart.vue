<template>
  <canvas id="calorieChart"></canvas>
</template>

<script>
import {mapGetters} from 'vuex';
import Chart from 'chart.js';

export default {
  name: 'CalorieChart',
  data() {
    return {
      ctx: null,
      weekCalories: [
        1820,
        1980,
        1545,
      ],
    }
  },
  computed: {
    ...mapGetters([
      'selectedDate',
      'weekOfCalories',
    ]),
    data() {
      return {

      }
    },
  },
  mounted() {
    let colorPrimary = 'rgba(44, 82, 130, 1)';
    let colorSelected = 'rgba(122, 151, 235, 1)';
    new Chart(document.getElementById('calorieChart').getContext('2d') , {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', '',''],
        datasets: [{
            barPercentage: 1.1,
            minBarLength: 2,
            data: [2650, 1950, 2650, 0, 2105, 1860, 1920],
            backgroundColor: [
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
            ],
            hoverBackgroundColor: [
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
            ],
            borderColor: [
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorPrimary,
              colorSelected,
            ],
            borderWidth: 2
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
              gridLines: {
                  display: false
              }
            }],
            yAxes: [{
              ticks: {
                display: false
              },
              gridLines: {
                  display: false
              }
            }]
        }
      }
    });
  }
}
</script>
