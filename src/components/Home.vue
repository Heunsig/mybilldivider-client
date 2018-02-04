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
            <p class="white--text body-2">Last updated 01/28/2018</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center mt-5 pt-5">
          <div>
            <v-btn 
              color="yellow" 
              outline 
              dark
              @click="routerPush({name: 'tutorial', params:{page: 'setting'}})"
              class="ics-buttons-in-home"
            >
              Start Tutorial
            </v-btn>
          </div>
          <div>
            <v-btn 
              dark 
              outline 
              @click="routerPush({name: 'calculator', params:{page: 'setting'}})"
              class="ics-buttons-in-home"
            >
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
  .ics-buttons-in-home {
    width:170px!important;
  }
</style>