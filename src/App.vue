<template>
  <!-- <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        I can split
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable
      :tabs="tabs"
    >
    </v-ons-tabbar>

  </v-ons-page> -->
  <v-app>
    <v-tabs dark grow>
      <v-toolbar app color="cyan" dark class="ics-toolbar">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>I can split</v-toolbar-title>
        <v-tabs-bar class="cyan" slot="extension">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item
            v-for="(tab, i) in tabs"
            :key="i"
            :href="'#tab-' + (i + 1)"
          >
            {{ tab.label }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-toolbar>
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
  </v-app>
</template>

<script>
import Home from '@/components/Home'
import People from '@/components/People'
import PriceEachPerson from '@/components/PriceEachPerson'
import PriceSharedMenu from '@/components/PriceSharedMenu'
import Result from '@/components/Result'

export default {
  data () {
    return {
      tabs: [
        {
          label: 'Home',
          component: 'Home'
        },
        {
          label: 'Add people',
          component: 'People'
        },
        {
          label: 'In person',
          component: 'PriceEachPerson'
        },
        {
          label: 'Shared menu',
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
    Home,
    People,
    PriceEachPerson,
    PriceSharedMenu,
    Result
  }
}
</script>
<style scoped>
.ics-toolbar{
  position: fixed;
  z-index: 2;
}
.ics-tabItems{
  padding-top: 98px;
}
@media screen and (max-width: 420px) {
  .ics-tabItems{
    padding-top: 112px;
  }
}
@media screen and (min-width: 960px) {
  .ics-tabItems{
    padding-top: 128px;
  }
}
</style>
