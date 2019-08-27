<template>
  <v-tabs
    dark 
    grow 
    class="ics-tabs" 
    v-model="activeTab"
  >
    <v-tabs-bar 
      dark 
      class="ics-tabsBar elevation-5" 
      :class="[ isTutorial() ? 'blue':'green' ]"
    >
      <v-tabs-slider color="yellow" />
      <v-tabs-item
        v-for="(tab, i) in tabs"
        :key="i"
        :href="tab.id"
        class="ics-tabItem-nav"
      >
        <span v-html="tab.label"></span>
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items 
      class="ics-tabItems"
    >
      <v-tabs-content
        v-for="(tab, i) in tabs"
        :key="i"
        :id="tab.id"
        class="ics-tabContent"
      >
        <v-card flat class="transparent">
          <v-card-text>
            <component 
              :is="tab.component" 
              :key="tab.id"
            />
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>
<script>
  import DefaultSetting from './SalesTax'
  import PriceEachPerson from './EachPerson'
  import PriceSharedMenu from './SharedMenu'

  export default {
    components: {
      DefaultSetting,
      PriceEachPerson,
      PriceSharedMenu
    },
    data () {
      return {
        activeTab: '',
        tabs: [
          {
            id: 'salesTax',
            label: 'Sales Tax',
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
          }
        ]
      }
    },
    watch: {
      activeTab (newTab) {
        this.changeRouterName(newTab)
        this.checkRefresh(newTab)
        this.$emit('activeTab', newTab)
      }
    },
    methods: {
      changeRouterName (tab) {
        let mainPath = (this.$route.fullPath).replace('/' + this.$route.params.page, '')
        let isHash = window.location.hash ? '#' : ''
        let changingPath = isHash + mainPath + '/' + tab

        // path without # any moment
        let changingPathWithoutHash = mainPath + '/' + tab
        window.history.pushState(null, null, changingPath)
        this.$ga.page(changingPathWithoutHash)
      },
      checkRefresh (tab) {
        this.tabs.forEach(obj => {
          if (obj.id === tab) {
            if (obj.refresh) {
              this.$emit('beAbleToRefresh', true)
            } else {
              this.$emit('beAbleToRefresh', false)
            }
          }
        })

        // // if (tab === 'result') {
        // //   if (this.salesTax === 0) {
        // //     this.activeDialog = {type: 'checkingSalesTax', bool: true}
        // //     this.testContinue = false
        // //   }
        // // }

        // if (this.isTutorial()) {
        //   this.openDialogTutorial()
        //   // if (this.tutorial.scripts.hasOwnProperty(tab)) {
        //     // this.tutorial.dialog = true
        //   // }
        // }
      },
      isTutorial () {
        if (this.$route.name === 'tutorial') {
          return true
        }

        return false
      },
      moveTabTo (tabId) {
        this.activeTab = tabId
      }
    },
    created () {
      this.activeTab = this.$route.params.page
    }
  }
</script>