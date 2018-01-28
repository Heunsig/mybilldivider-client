<template>
  <v-container fluid class="green ics-home-background">
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center mt-3">
          <h1 class="white--text ics-main-title">My Bill Divider</h1>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-card flat class="transparent mt-3">
          <v-card-text class="text-xs-center">
            <p class="white--text ics-sub-title">It's the easiest way to split the bill</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center mt-5 pt-5">
          <div>
            <v-btn color="yellow" outline dark @click="routerPush({name: 'tutorial', params:{page: 'setting'}})">
              Start Tutorial
            </v-btn>
          </div>
          <div>
            <v-btn dark outline @click="routerPush({name: 'calculator', params:{page: 'setting'}})">
              Start Calculating
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    methods: {
      routerPush (routerOptions) {
        this.$router.push(routerOptions)
        this.drawer = false
      }
    }
  }
</script>
<style scoped>
  .ics-main-title {
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight:normal;
    font-size: 50px;
  }
  .ics-home-background{
    height: 100%;
  }
  .ics-sub-title {
    font-family: 'Inder', sans-serif; 
    font-size:25px;
  }
  /*.ics-explanation {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ics-explanation > li {
    padding: 5px 0;
  }*/
</style>