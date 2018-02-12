<template>
  <v-container fluid class="ics-home-background" :class="dynamicBackground">
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center mt-3 pt-5">
          <h1 class="white--text ics-main-title">My Bill Divider</h1>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-card flat class="transparent">
          <v-card-text class="text-xs-center">
            <p class="white--text ics-sub-title">It's the easiest way to split the bill</p>
            <div>
              <!-- <div class="white--text" style="font-size:25px;">Total</div>  -->
              <ICountUp
                class="white--text"
                style="font-size:40px;"
                :startVal="0"
                :endVal="totalNumberOfUses"
                :decimals="0"
                :duration="2.5"
                :options="{
                  separator: ','
                }"
              /></ICountUp>
              <div class="white--text" style="font-size:20px;">people have split the bill</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center mt-2 pt-2">
          <div>
            <v-btn 
              color="blue" 
              dark
              @click="routerPush({name: 'tutorial', params:{page: 'setting'}})"
              class="ics-buttons-in-home"
            >
              Start Tutorial
            </v-btn>
          </div>
          <div>
            <v-btn
              color="green" 
              dark 
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
  import ICountUp from 'vue-countup-v2'

  export default {
    created () {
      this.$http.get(this.$PATH_API + 'log').then(res => {
        this.totalNumberOfUses = res.body.count
      }, err => {
        console.log(err)
      })
    },
    data () {
      return {
        totalNumberOfUses: 0
      }
    },
    computed: {
      dynamicBackground () {
        return this.$store.getters['base/getBackgroundMainCss']
      }
    },
    methods: {
      routerPush (routerOptions) {
        this.$router.push(routerOptions)
        this.drawer = false
      }
    },
    components: {
      ICountUp
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
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212121;
    height: 100%;
  }
  .ics-sub-title {
    font-family: 'Inder', sans-serif; 
    font-size:25px;
  }
  .ics-buttons-in-home {
    width:170px!important;
  }

   .ics-home-background-01 {
    background-image: url('https://mybilldivider.com/images/bg_main_01_pc.jpg');
  }

  .ics-home-background-02 {
    background-image: url('https://mybilldivider.com/images/bg_main_02_pc.jpg');
  }

  .ics-home-background-03 {
    background-image: url('https://mybilldivider.com/images/bg_main_03_pc.jpg');
  }

  @media only screen and (max-width: 767px) {
    .ics-home-background-01 {
      background-image: url('https://mybilldivider.com/images/bg_main_01_m.jpg');
    }

    .ics-home-background-02 {
      background-image: url('https://mybilldivider.com/images/bg_main_02_m.jpg');
    }

    .ics-home-background-03 {
      background-image: url('https://mybilldivider.com/images/bg_main_03_m.jpg');
    }
  }

</style>