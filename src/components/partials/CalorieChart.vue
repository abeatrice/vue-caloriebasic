<template>
  <canvas id="calorieChart" style="z-index: -1;"></canvas>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Chart from 'chart.js';

export default {
  name: 'CalorieChart',
  data() {
    return {
      chart: null,
      color: {
        primary: 'rgba(44, 82, 130, .5)',
        selected: 'rgba(122, 151, 235, .5)',
        transparent: 'rgba(0, 0, 0, 0)',
        danger: 'rgba(245, 101, 101, .5)',
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedDateIso',
      'weekOfCalories',
      'chartData'
    ])
  },
  methods: {
    ...mapActions([
      'getWeekOfCalories'
    ]),
    dates() {
      return this.weekOfCalories.map(({_id}) => _id.date);
    },
    quantities() {
      return this.weekOfCalories.map(({quantity}) => quantity);
    },
    backgroundColors() {
      return this.weekOfCalories.map(({quantity}) => quantity > "2000" ? this.color.danger : this.color.primary);
    },
    borderColors() {
      return this.weekOfCalories.map(({_id}) => _id.date == this.selectedDateIso ? this.color.selected : this.color.transparent);
    },
    buildChart() {
      return new Chart(document.getElementById('calorieChart').getContext('2d') , {
        type: 'bar',
        data: {
          labels: this.dates(),
          datasets: [{
            order: 2,
            barPercentage: 1.1,
            minBarLength: 2,
            data: this.chartData,
            backgroundColor: this.backgroundColors(),
            hoverBackgroundColor: this.backgroundColors(),
            borderColor: this.borderColors(),
            borderSkipped: 'false',
            borderWidth: {
              'left': 0,
              'right': 0,
              'top': 0,
              'bottom': 3,
            },
          }, {
            order: 1,
            type: 'line',
            data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
            pointRadius: 0,            
            borderColor: this.color.selected,
            borderWidth: 1,
            fill: false,
          },]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          },
          layout: {
            padding: {
              left: -10,
            }
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
                  display: false,
                  beginAtZero: true,
                  suggestedMax: 2500
                },
                gridLines: {
                    display: false
                }
              }]
          }
        }
      });
    },
  },
  async mounted() {
    await this.getWeekOfCalories();
    this.chart = this.buildChart(); 
  },
  watch: {
    selectedDateIso() {
      this.chart.data.datasets[0].borderColor = this.borderColors();
      this.chart.update();
    },
    chartData() {
      if(this.chart) {
        this.chart.data.datasets[0].data = this.chartData;
        this.chart.data.datasets[0].backgroundColor = this.backgroundColors();
        this.chart.update();
      }
    },
  }
}
</script>
