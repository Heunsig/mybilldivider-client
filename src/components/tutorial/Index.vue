<template>
  <div class="ics-warpper">
    <v-tabs dark grow class="ics-tabs" @input="changeTab" v-model="active">
      <v-tabs-bar dark class="blue ics-tabsBar elevation-5">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item
          v-for="(tab, i) in tabs"
          :key="i"
          :href="tab.id"
          class="ics-tabItem-nav"
        >
          <span v-html="tab.label"></span>
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items class="ics-tabItems">
        <v-tabs-content
          v-for="(tab, i) in tabs"
          :key="i"
          :id="tab.id"
          class="ics-tabContent"
        >
          <v-card flat class="transparent">
            <v-card-text>
              <div :is="tab.component"></div>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    
    <v-dialog v-model="dialog" persistent scrollable max-width="290">
      <v-card>  
        <v-toolbar color="blue" dark dense flat>
          <v-toolbar-title>Tutorial</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <swiper :options="swiperOption">
            <swiper-slide>
              <div>
                <h3 class="pb-1">My Bill Divider is here to help!</h3>
                <div style="font-size:15px;">
                   <p>This app makes it easy to split the bill between friends.</p>
                   <p>Simply input some information into this app, and it will tell you how much each person needs to pay for their meal.</p> 
                   <p class="mb-0">Click "Next" to continue the tutorial.</p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              Daivd, Micheal, Mary and Rose had a lovely meal in a terrific restaurant. After eating dinner, Mary asks, "May I have the bill?" When the bill arrives, they encounter an annoying situation.
            </swiper-slide>
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              They can't split the bill beause each person ordered different food. "How should we split the bill?" Michael asks. "I have no idea" Rose responds.
            </swiper-slide>
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              "Don't worry, I can do it!" David takes out his phone and opens up My Bill Divider.
            </swiper-slide>
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              "Okay, First, we need to set the sales tax. It should be listed on our receipts. If not, we can use the app's sales tax calculator. Umm... Here in L.A, The sales tax is 9.5%."
            </swiper-slide>
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              After that, David goes to the next tab. He inputs items that each person has eaten on the 'EACH PERSON' page, and items that we've shared on the 'SHARED ITEMS' page.
            </swiper-slide>
          </swiper>
          <div class="text-xs-right">
            <v-btn flat class="pa-0 ma-0 ics-swiper-button-next ics-font-patrick-hand" style="font-size:20px;">Next</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="pa-0 pb-3 pr-3">
          <v-spacer></v-spacer>
          <div class="ics-swiper-pagination"></div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent scrollable max-width="290">
      <v-card>  
        <v-toolbar color="blue" dark dense flat>
          <v-toolbar-title>Tutorial</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog2 = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <swiper :options="swiperOption2">
            <swiper-slide class="ics-font-patrick-hand ics-swiper-slide">
              "Here we are. It's our payments. I like this place, so I'll leave 25% tips.
              Also, If click 
              <v-btn fab dark color="green" class="ma-1 ics-button-smaller">
                <v-icon style="font-size:15px;">attach_money</v-icon>
              </v-btn>, 
              we can see the sum of everybody's payments." David says as he feels proud.
            </swiper-slide>
            <swiper-slide>
              <div>
                <h3 class="pb-1">Are you ready to split the bill?</h3> 
                <div style="font-size:15px;">
                  <p>The tutorial is over. We hope you don't feel tired of calculating the bill.</p>
                  <p>
                    Click 
                    <v-btn small dark icon color="blue" class="ma-1">
                      <v-icon style="font-size:16px;">grade</v-icon>
                    </v-btn> to start calculating.
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="text-xs-right">
            <v-btn flat class="pa-0 ma-0 ics-swiper-button-next2 ics-font-patrick-hand" style="font-size:20px;">Next</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="pa-0 pb-3 pr-3">
          <v-spacer></v-spacer>
          <div class="ics-swiper-pagination2"></div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn
      v-if="progressButtonLast"
      color="blue"
      dark
      fab
      fixed
      bottom
      right
      @click.native="routerPush('calculator')"
    >
      <v-icon>grade</v-icon>
    </v-btn>
  </div>
</template>

<script>
import DefaultSetting from './DefaultSetting'
import PriceEachPerson from './PriceEachPerson'
import PriceSharedMenu from './PriceSharedMenu'
import Result from './Result'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  data () {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.ics-swiper-button-next'
        },
        pagination: {
          el: '.ics-swiper-pagination',
          clickable: true
        }
      },
      swiperOption2: {
        navigation: {
          nextEl: '.ics-swiper-button-next2'
        },
        pagination: {
          el: '.ics-swiper-pagination2',
          clickable: true
        }
      },
      // currentScript: null,
      dialog: true,
      dialog2: false,
      progressButtonLast: false,
      active: null,
      tabs: [
        {
          id: 'setting',
          label: 'Settings',
          component: 'DefaultSetting'
        },
        {
          id: 'eachPerson',
          label: 'Each<br/>person',
          component: 'PriceEachPerson',
          refresh: true
        },
        {
          id: 'sharedItem',
          label: 'Shared<br/>Items',
          component: 'PriceSharedMenu',
          refresh: true
        },
        {
          id: 'result',
          label: 'Result',
          component: 'Result'
        }
      ]
    }
  },
  components: {
    DefaultSetting,
    PriceEachPerson,
    PriceSharedMenu,
    Result,
    swiper,
    swiperSlide
  },
  methods: {
    changeTab (id) {
      if (id === this.tabs[this.tabs.length - 1].id) {
        this.progressButtonLast = true
      } else {
        this.progressButtonLast = false
      }

      if (id === 'setting') {
        this.dialog = true
        this.dialog2 = false
      } else if (id === 'result') {
        this.dialog = false
        this.dialog2 = true
      }
    },
    routerPush (name) {
      this.$router.push({name: name})
    }
  }
}
</script>
<style scoped>
.ics-warpper{
  height: 100%;
}
.ics-toolbar{
  position: fixed;
  z-index: 5;
}
.ics-tabItem-nav{
  font-size: 13px;
  font-weight: 500;
}
.ics-tabsBar{
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 3;
}
.ics-tabItems{
  height: 100%;
}
.ics-tabContent{
  padding-top: 48px;
  height: 100%;
}
.ics-tabs{height: 100%;}
.ics-btn-refresh{
  position: fixed;
  top: 0;
  right: 8px;
  z-index: 4;
}

.ics-msg-setSalesTax{
  font-size: 14px;
}

.swiper-pagination{
  position: relative!important;
  bottom: auto!important;
}

.swiper-button-next{
  top: auto!important;
  width: auto!important;
  bottom: 10px!important;
  background:none!important;
}

</style>
<style>
.swiper-wrapper {}

.swiper-pagination-bullet{
  margin:3px;
}

.swiper-button-disabled {
  color:#b1b1b1!important;
}

.ics-swiper-slide {
  font-size: 22px;
}
.ics-font-patrick-hand {
  font-family: 'Patrick Hand', cursive;
}
.ics-font-roboto {
  font-family: 'Roboto', sans-serif;
}
.ics-msg-closeDialog {font-size:15px;}
</style>
