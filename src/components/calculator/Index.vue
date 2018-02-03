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
            <div :is="tab.component"></div>
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
  </div>
</template>

<script>
import DefaultSetting from './DefaultSetting'
import PriceEachPerson from './PriceEachPerson'
import PriceSharedMenu from './PriceSharedMenu'
import Result from './Result'
import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
import routingForTab from '@/mixins/routingForTab'

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
      ]
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
    Result
  },
  methods: {
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
