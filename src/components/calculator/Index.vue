<template>
  <div class="ics-warpper">
    <v-btn icon flat class="ics-btn-refresh" v-if="refresh" @click="refreshPage">
      <v-icon color="white">refresh</v-icon>
    </v-btn>
    <v-tabs dark grow class="ics-tabs" @input="changeTab" v-model="tabInMixin">
      <v-tabs-bar dark class="ics-tabsBar elevation-5" :class="[isTutorial() ? 'blue':'green']">
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
              <div :is="tab.component" :key="tab.id"></div>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <v-dialog persistent v-model="dialogs.refreshPage" max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
          Do you want to refresh this page?
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogRefreshingPage">Cancel</v-btn>
          <template v-if="refreshMode === 'eachPerson'">
            <v-btn color="red darken-1" flat block @click.native="confirmToClearEachPersonPage">Confirm</v-btn>
          </template>
          <template v-else>
            <v-btn color="red darken-1" flat block @click.native="confirmToClearSharedMenuPage">Confirm</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogs.tempDialog" max-width="290">
      <v-card>
        <v-card-title class="light-green white--text ics-dialog-title">
          Are you sure {{ salesTax + '%' }} Sales tax?
        </v-card-title>
        <v-card-text>
          You've set the sales tax.<br/>
          Do you want to go back to the tab to set it?
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="grey darken-2" @click="activeDialog = {type: 'tempDialog', bool: false}">
            No
          </v-btn>
          <v-btn block flat color="light-green" @click="goBackToTabToSetSalesTax">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="tutorial.dialogs.intro" persistent scrollable max-width="290">
      <v-card>  
        <v-toolbar color="blue" dark dense flat>
          <v-toolbar-title>Tutorial</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="tutorial.dialogs.intro = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <swiper :options="tutorial.swiperOptionsGroups.intro">
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

    <v-dialog v-model="tutorial.dialogs.conclusion" persistent scrollable max-width="290">
      <v-card>  
        <v-toolbar color="blue" dark dense flat>
          <v-toolbar-title>Tutorial</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="tutorial.dialogs.conclusion = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <swiper :options="tutorial.swiperOptionsGroups.conclusion">
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
      color="blue"
      dark
      fab
      fixed
      bottom
      right
      @click="routerPush({name: 'calculator', params: {page: 'eachPerson'}})"
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
import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
import routingForTab from '@/mixins/routingForTab'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import imageExampleSalesTax from '@/assets/example_salesTax.gif'
import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

export default {
  mixins: [
    fixingModalBugInIphone,
    routingForTab
  ],
  data () {
    return {
      images: {
        imageExampleSalesTax,
        imageExampleSubtotalAndTax
      },
      dialogs: {
        refreshPage: false,
        setSalesTax: false,
        tempDialog: false
      },
      refresh: false,
      refreshMode: 'eachPerson',
      currentTab: {},
      tabs: [
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
          id: 'setting',
          label: 'Settings',
          component: 'DefaultSetting'
        },
        {
          id: 'result',
          label: 'Result',
          component: 'Result'
        }
      ],
      tutorial: {
        dialogs: {
          intro: false,
          conclusion: false
        },
        swiperOptionsGroups: {
          intro: {
            navigation: {
              nextEl: '.ics-swiper-button-next'
            },
            pagination: {
              el: '.ics-swiper-pagination',
              clickable: true
            }
          },
          conclusion: {
            navigation: {
              nextEl: '.ics-swiper-button-next2'
            },
            pagination: {
              el: '.ics-swiper-pagination2',
              clickable: true
            }
          }
        }
      }
    }
  },
  computed: {
    salesTax () {
      return this.$store.getters[this.$route.name + '/' + 'getSalesTax']
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
    routerPush (option) {
      this.$router.push(option)
    },
    isTutorial () {
      if (this.$route.name === 'tutorial') {
        return true
      } else {
        return false
      }
    },
    closeDialogRefreshingPage () {
      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    refreshPage () {
      this.activeDialog = {type: 'refreshPage', bool: true}
      if (this.currentTab.id === 'eachPerson') {
        this.refreshMode = 'eachPerson'
      } else if (this.currentTab.id === 'sharedItem') {
        this.refreshMode = 'sharedItem'
      }
    },
    confirmToClearEachPersonPage () {
      this.$store.commit(this.$route.name + '/' + 'clearPeople')

      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    confirmToClearSharedMenuPage () {
      this.$store.commit(this.$route.name + '/' + 'clearMenu')

      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    goBackToTabToSetSalesTax () {
      this.tabInMixin = 'setting'
      this.activeDialog = {type: 'tempDialog', bool: false}
    },
    changeTab (tab) {
      this.tabs.forEach(obj => {
        if (obj.id === tab) {
          if (obj.refresh) {
            this.currentTab = obj
            this.refresh = true
          } else {
            this.currentTab = {}
            this.refresh = false
          }
        }
      })

      if (tab === 'result') {
        if (this.salesTax === 0) {
          this.activeDialog = {type: 'tempDialog', bool: true}
        }
      }

      if (tab === 'eachPerson') {
        this.tutorial.dialogs.intro = true
        this.tutorial.dialogs.conclusion = false
      } else if (tab === 'result') {
        this.tutorial.dialogs.intro = false
        this.tutorial.dialogs.conclusion = true
      }
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
