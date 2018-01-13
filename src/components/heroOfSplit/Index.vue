<template>
  <v-tabs dark grow class="ics-tabs">
    <v-tabs-bar dark class="green ics-tabsBar">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tabs-item
        v-for="(tab, i) in tabs"
        :key="i"
        :href="'#tab-' + (i + 1)"
        class="ics-tabItem-nav"
      >
        <span v-html="tab.label"></span>
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items class="ics-tabItems">
      <v-tabs-content
        v-for="i in tabs.length"
        :key="i"
        :id="'tab-' + i"
        class="ics-tabContent"
      >
        <v-card flat class="grey lighten-4">
          <v-card-text>
            <div :is="tabs[i-1].component"></div>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import DefaultSetting from './DefaultSetting'
import PriceEachPerson from './PriceEachPerson'
import PriceSharedMenu from './PriceSharedMenu'
import Result from './Result'

export default {
  data () {
    return {
      tabs: [
        {
          label: 'Settings',
          component: 'DefaultSetting'
        },
        {
          label: 'Each<br/>person',
          component: 'PriceEachPerson'
        },
        {
          label: 'Shared<br/>menu',
          component: 'PriceSharedMenu'
        },
        {
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
    Result
  }
}
</script>
<style scoped>
.ics-toolbar{
  position: fixed;
  z-index: 5;
}
.ics-tabItem-nav{
  font-size:12px;
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
</style>
