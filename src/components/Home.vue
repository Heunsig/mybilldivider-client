<template>
  <v-tabs dark grow class="ics-tabs">
    <v-tabs-bar dark class="cyan ics-tabsBar">
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
      >
        <v-card flat>
          <v-card-text>
            <div :is="tabs[i-1].component"></div>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import DefaultSetting from '@/components/DefaultSetting'
import PriceEachPerson from '@/components/PriceEachPerson'
import PriceSharedMenu from '@/components/PriceSharedMenu'
import Result from '@/components/Result'

export default {
  data () {
    return {
      tabs: [
        {
          label: 'Home',
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
  top: 56px;
  left: 0;
  z-index: 4;
}
.ics-tabItems{
  padding-top: 48px;
  height: 100%;
}
.ics-tabs{height: 100%;}
/*@media screen and (max-width: 420px) {
  .ics-tabItems{
    padding-top: 112px;
  }
}
@media screen and (min-width: 960px) {
  .ics-tabItems{
    padding-top: 128px;
  }
}*/
</style>
