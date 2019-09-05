<template>
  <div class="h-full flex justify-center items-center">
    <div class="w-3/4 md:w-1/2">    
    <h1 class="text-center text-xl font-semibold">calories</h1>
    <p class="text-center text-xl font-semibold">{{calories}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
        'calories'
    ])
  },
  mounted() {
    this.getCalories();
  },
  methods: {
    ...mapActions([
      'getCalories'
    ]),
  }
}
</script>
