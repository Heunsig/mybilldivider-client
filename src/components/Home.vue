<template>
  <v-container fluid class="green ics-home-background">
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center mt-3">
          <!-- <img src="http://icansplit.catchasoft.com/new/logo_new.png" alt="My bill divider"/> -->
          <h1 class="white--text ics-main-title">My Bill Divider</h1>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-card flat class="transparent mt-3">
          <v-card-text class="text-xs-center">
            <!-- <ul class="ics-explanation">
              <li>
                <div class="ics-explanation-order">1</div>
                <div class="ics-explanation-content">Set sales tax rate</div>
              </li>
              <li>
                <div class="ics-explanation-order">2</div>
                <div class="ics-explanation-content">Add people and items</div>
              </li>
              <li>
                <div class="ics-explanation-order">3</div>
                <div class="ics-explanation-content">Add shared items</div>
              </li>
              <li>
                Get a result
              </li>
            </ul> -->
            <p class="white--text ics-sub-title">It's the easiest way to split the bill up.</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center mt-5 pt-4">
          <v-btn dark outline @click="routerPush('calculator')">
            Get Start Calculating
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    methods: {
      routerPush (name) {
        this.$router.push({name: name})
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