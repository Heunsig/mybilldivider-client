<template>
  <div class="ics-warpper">
    <v-btn 
      icon 
      flat 
      class="ics-btn-refresh" 
      v-if="refresh"
      @click="openDialogRefreshingPage"
    >
      <v-icon color="white">refresh</v-icon>
    </v-btn>
  
    <Tabs
      ref="tabs"
      @activeTab="activeTab = $event"
      @beAbleToRefresh="refresh = $event"
    />

    <DialogRefreshingPage
      ref="dialogRefreshingPage"
      :activeTab="activeTab"
    />

    <DialogCheckingSalesTax 
      ref="dialogCheckingSalesTax"
      :moveTabTo="moveTabTo"
    />

    <DialogTutorial 
      ref="dialogTutorial"
    />

    <v-btn
      color="blue"
      dark
      fab
      fixed
      bottom
      right
      @click="seeResult"
    >
      <v-icon>fa-calculator</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Tabs from './tabs'
import DialogRefreshingPage from './DialogRefreshingPage'
import DialogCheckingSalesTax from './DialogCheckingSalesTax'
import DialogTutorial from './DialogTutorial'

import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

export default {
  components: {
    Tabs,
    DialogRefreshingPage,
    DialogCheckingSalesTax,
    DialogTutorial
  },
  mixins: [
    fixingModalBugInIphone
  ],
  data () {
    return {
      activeTab: '',
      refresh: false
    }
  },
  computed: {
    salesTax () {
      return this.$store.getters['calculator/getSalesTax']
    }
  },
  methods: {
    openDialogRefreshingPage () {
      this.$refs.dialogRefreshingPage.openDialog()
    },
    seeResult () {
      if (this.salesTax === 0) {
        this.$refs.dialogCheckingSalesTax.openDialog()
      } else {
        this.$router.push({
          name: 'result',
          params: {
            mode: this.$route.name
          }
        })
      }
    },
    moveTabTo (tabId) {
      return this.$refs.tabs.moveTabTo(tabId)
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
/*.testButton{
  position: fixed;
  top: 0;
  right: 40px;
  z-index: 4; 
}
*/

.ics-msg-setSalesTax{
  font-size: 14px;
}

</style>
<style>
  .ics-tab-item-result > .tabs__item{
    opacity: 1!important;
  }
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
  /*.ics-font-roboto {
    font-family: 'Roboto', sans-serif;
  }*/
  .ics-msg-closeDialog {font-size:15px;}
</style>
