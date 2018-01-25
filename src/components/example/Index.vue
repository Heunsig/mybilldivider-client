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
    
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-toolbar color="blue" dark dense>
        <v-toolbar-title>Situation</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-card-text>
        </v-card-text>
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
      @click.native="next"
      v-else
    >
      <v-icon>close</v-icon>
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
        pagination: {
          el: '.swiper-pagination'
        }
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
