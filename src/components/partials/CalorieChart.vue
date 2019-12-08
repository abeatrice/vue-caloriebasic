<template>
  <canvas id="calorieChart" class="z-0"></canvas>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Chart from 'chart.js';
import moment from 'moment';

export default {
  name: 'CalorieChart',
  data() {
    return {
      chart: null,
      color: {
        primary: 'rgba(44, 82, 130, 1)',
        selected: 'rgba(122, 151, 235, 1)',
        unSelected: 'rgba(45, 55, 72, 1)',
        danger: 'rgba(245, 101, 101, 1)',
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedDate',
      'weekOfCalories',
      'chartData'
    ])
  },
  methods: {
    ...mapActions([
      'getWeekOfCalories'
    ]),
    dates: function() {
      return this.weekOfCalories.map(({_id}) => _id.date);
    },
    quantities: function() {
      return this.weekOfCalories.map(({quantity}) => quantity);
    },
    backgroundColors: function() {
      return this.weekOfCalories.map(({quantity}) => quantity > "2000" ? this.color.danger : this.color.primary);
    },
    borderColors: function() {
      return this.weekOfCalories.map(({_id}) => _id.date == new moment(this.selectedDate).format('YYYY-MM-DD') ? this.color.selected : this.color.unSelected);
    }
  },
  async mounted() {
    await this.getWeekOfCalories();
    this.chart = new Chart(document.getElementById('calorieChart').getContext('2d') , {
      type: 'bar',
      data: {
        labels: this.dates(),
        datasets: [{
            barPercentage: 1.1,
            minBarLength: 2,
            data: this.chartData,
            backgroundColor: this.backgroundColors(),
            hoverBackgroundColor: this.backgroundColors(),
            borderColor: this.borderColors(),
            borderWidth: 0
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
              ticks: {
                display: false
              },
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
