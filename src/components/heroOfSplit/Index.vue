<template>
  <div>
  <v-btn icon flat class="ics-btn-refresh" v-if="refresh" @click="refreshPage">
    <v-icon color="white">refresh</v-icon>
  </v-btn>
  <v-tabs dark grow class="ics-tabs" @input="changeTab">
    <v-tabs-bar dark class="green ics-tabsBar">
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
        <v-card flat class="grey lighten-4">
          <v-card-text>
            <div :is="tab.component"></div>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>

  <v-dialog persistent v-model="dialogRefreshingPage">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to refresh this page?
      </v-card-title>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="dialogRefreshingPage = false">Cancel</v-btn>
        <template v-if="refreshMode === 'eachPerson'">
          <v-btn color="red darken-1" flat block @click.native="confirmToClearEachPersonPage">Confirm</v-btn>
        </template>
        <template v-else>
          <v-btn color="red darken-1" flat block @click.native="confirmToClearSharedMenuPage">Confirm</v-btn>
        </template>
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

export default {
  data () {
    return {
      dialogRefreshingPage: false,
      refresh: false,
      refreshMode: 'eachPerson',
      currentTab: {},
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
          id: 'sharedMenu',
          label: 'Shared<br/>menu',
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
  computed: {
    menu () {
      return this.$store.getters.getMenu
    },
    people () {
      return this.$store.getters.getPeople
    }
  },
  components: {
    DefaultSetting,
    PriceEachPerson,
    PriceSharedMenu,
    Result
  },
  methods: {
    refreshPage () {
      this.dialogRefreshingPage = true
      if (this.currentTab.id === 'eachPerson') {
        this.refreshMode = 'eachPerson'
      } else if (this.currentTab.id === 'sharedMenu') {
        this.refreshMode = 'sharedMenu'
      }
    },
    confirmToClearEachPersonPage () {
      this.$store.commit('clearPeople')

      this.dialogRefreshingPage = false
    },
    confirmToClearSharedMenuPage () {
      this.$store.commit('clearMenu')

      this.dialogRefreshingPage = false
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
    }
  }
}
</script>
<style scoped>
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
  z-index: 4;
  box-shadow: 0px 5px 16px -5px #313131;
}
.ics-tabItems{
  height: 100%;
}
.ics-tabContent{
  padding-top: 48px;
}
.ics-tabs{height: 100%;}
.ics-btn-refresh{
  position: fixed;
  top: 0;
  right: 8px;
  z-index: 4;
}
</style>
