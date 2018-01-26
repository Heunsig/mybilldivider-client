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
          <swiper :options="swiperOption" style="font-size:22px;">
            <swiper-slide v-for="content in scripts[currentScript]" :key="content" v-html="content" class="ics-font-patrick-hand"></swiper-slide>
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

    <v-btn
      color="blue"
      dark
      fab
      fixed
      bottom
      right
      @click.native="next"
      v-if="!progressButtonLast"
    >
      <v-icon>keyboard_arrow_right</v-icon>
    </v-btn>
    <v-btn
      color="blue"
      dark
      fab
      fixed
      bottom
      right
      @click.native="routerPush('calculator')"
      v-else
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
      currentScript: null,
      scripts: {
        setting: [
          `<div class="ics-font-roboto">
             <h6 class="pb-1">My Bill Divider absolutely helps you.</h6> 
             <div class="body-1">
                <p>This app has been made for splitting the bill easy after eating with friends. If you input your some information into forms given, you can get a result about how much each person pay for foods.</p>
                <p>I've made a situation that you usually face it in real, so you might easily understand how to use the app if you follow the tutorial process.</p> 
                Click the Next button.
             </div>
           </div>
           `,
          `David, Michael, Mary and Rose have spent lovely time with fabulous food in the restaurant.
           "May I have a bill, please?" Mary said after eating dinner. When we took the bill, we encountered an
          annoying situation.</div></div>`,
          `We couldn't split the bill because we ordered different foods each person. "How should we break the bill?" Michael said.
          "I have no idea" Rose said. "Don't worry. I can do it." David said, and he took his cellphone out. he connected to My Bill Divider`,
          `"Okey. First, we should set the sales tax. We can find it on our receipt. If not, we can use the sales tax calculator that you could see on the dialog. Here, LA is 9.5% sales tax."<br/>
          <span class='ics-msg-closeDialog ics-font-roboto blue--text'>Look around the tab after close this dialog. If you finish, go to the next tab.</span>`
        ],
        eachPerson: [
          `"Second, we should input what we've eaten each person. I've eaten a Double cheese burger and French fries. Michael is a Cheese burger and a soda.
          Mary is a Hot dog and a soda. Rose is a Sandwich and a cup of coffee."<br/>
          <span class='ics-msg-closeDialog ics-font-roboto blue--text'>Look around this tab after close this dialog.</span>`
        ],
        sharedItem: [
          `"Third, we together have eaten a Pepperoni pizza, and Michael and I have eaten a Salmon salad as well, so we should input also these foods. The app is going to automatically split prices."<br/>
          <span class='ics-msg-closeDialog ics-font-roboto blue--text'>Look around this tab after close this dialog.</span>`
        ],
        result: [
          `"Finally, we've gotten a result how much each person has to pay. Oh! I forgot to set the tip rate. I like this place, so I'll give 25% tip. Here we are. We can see total payments, "`,
          `details, and If you push the green button on the bottom left of the screen, you can see the sum of everybody's payments.<br/>
          <span class='ics-msg-closeDialog ics-font-roboto blue--text'>Finish the tutorial. Push the blue button on the bottom right to go to the app.</span>`
        ]
      },
      dialog: true,
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
    next () {
      let index = 0
      this.tabs.forEach((tab, i) => {
        if (tab.id.indexOf(this.active) !== -1) {
          index = i
        }
      })

      if (this.tabs[(index + 1)]) {
        this.active = this.tabs[(index + 1)].id

        if (index + 1 === this.tabs.length - 1) {
          this.progressButtonLast = true
        }
      }
    },
    changeTab (id) {
      if (id === this.tabs[this.tabs.length - 1].id) {
        this.progressButtonLast = true
      } else {
        this.progressButtonLast = false
      }

      this.dialog = true
      this.currentScript = id
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

.ics-font-patrick-hand {
  font-family: 'Patrick Hand', cursive;
}
.ics-font-roboto {
  font-family: 'Roboto', sans-serif;
}
.ics-msg-closeDialog {font-size:15px;}
</style>
