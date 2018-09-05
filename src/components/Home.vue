<template>
  <v-container fluid class="ics-home-background">
    <div id="responsibility_observer"></div>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center mt-2 pt-1">
          <!-- <p class="white--text ics-sub-title">
            {{ text[Math.floor(Math.random() * text.length)] }}
          </p> -->
          <h1 class="white--text ics-main-title">My Bill Divider</h1>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-card flat class="transparent">
          <v-card-text class="text-xs-center">
            <!-- <p class="white--text ics-sub-title">It's the easiest way to split the bill</p> -->
            <!-- <p class="white--text ics-sub-title">How to split the bill when I didn't ordered any drink?</p> -->
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
              /></ICountUp> <span class="white--text" style="font-size:20px;">people</span>
              <div class="white--text" style="font-size:20px;">have split the bill</div>
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
              @click="routerPush({name: 'tutorial', params:{page: 'salesTax'}})"
              class="ics-buttons-in-home"
            >
              Start Tutorial
            </v-btn>
          </div>
          <div>
            <v-btn
              color="green" 
              dark 
              @click="routerPush({name: 'calculator', params:{page: 'salesTax'}})"
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
  // import imageBgMain01PC from '@/assets/images/bg_main_01_pc.jpg'
  // import imageBgMain02PC from '@/assets/images/bg_main_02_pc.jpg'
  // import imageBgMain03PC from '@/assets/images/bg_main_03_pc.jpg'
  // import imageBgMain01M from '@/assets/images/bg_main_01_m.jpg'
  // import imageBgMain02M from '@/assets/images/bg_main_02_m.jpg'
  // import imageBgMain03M from '@/assets/images/bg_main_03_m.jpg'
  // import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

  export default {
    created () {
      this.$http.get(this.$PATH_API + 'log').then(res => {
        this.totalNumberOfUses = res.body.count
      }, err => {
        console.log(err)
      })
    },
    mounted () {
      this.wall = document.querySelector('.ics-home-background')
      this.selectedBgImage = this.backgroundImages[Math.floor(Math.random() * 3)]
      window.addEventListener('resize', this.onResize)
      this.onResize()
    },
    destroyed () {
      window.removeEventListener('resize', this.onResize)
    },
    data () {
      return {
        totalNumberOfUses: 0,
        text: [
          'How to split the restaurant bill when I didn\'t order any drink?',
          'How to split the restaurant bill when each person ordered different food?',
          'How to split the restaurant bill when one friend ordered expensive food?',
          'How to split the restaurant bill when I just want to eat the cheapest food?'
        ],
        wall: '',
        backgroundImages: [
          {
            pc: 'bg_main_01_pc.jpg',
            m: 'bg_main_01_m.jpg'
          },
          {
            pc: 'bg_main_02_pc.jpg',
            m: 'bg_main_02_m.jpg'
          },
          {
            pc: 'bg_main_03_pc.jpg',
            m: 'bg_main_03_m.jpg'
          }
        ],
        selectedBgImage: {}
      }
    },
    computed: {
      dynamicBackground () {
        return this.$store.getters['base/getBackgroundMainCss']
      }
    },
    methods: {
      onResize () {
        try {
          let observer = document.querySelector('#responsibility_observer')
          if (window.getComputedStyle(observer).getPropertyValue('display') === 'block') {
            // PC
            this.wall.style.backgroundImage = `url(${this.$PATH_IMAGE}${this.selectedBgImage.pc})`
          } else {
            // Mobile
            this.wall.style.backgroundImage = `url(${this.$PATH_IMAGE}${this.selectedBgImage.m})`
          }
        } catch (e) { }
      },
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
    font-size: 55px;
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
    font-size:17px;
  }
  .ics-buttons-in-home {
    width:170px!important;
  }

   /*.ics-home-background-01 {
    background-image: url('/images/bg_main_01_pc.jpg');
  }

  .ics-home-background-02 {
    background-image: url('/images/bg_main_02_pc.jpg');
  }

  .ics-home-background-03 {
    background-image: url('/images/bg_main_03_pc.jpg');
  }*/
  
  #responsibility_observer {
    width:0;
    height:0;
    visibility: hidden;
    display: block;
  }

  @media only screen and (max-width: 767px) {
    #responsibility_observer {
      display: none;
    }

    /*.ics-home-background-01 {
      background-image: url('/images/bg_main_01_m.jpg');
    }

    .ics-home-background-02 {
      background-image: url('/images/bg_main_02_m.jpg');
    }

    .ics-home-background-03 {
      background-image: url('/images/bg_main_03_m.jpg');
    }*/
  }

</style>