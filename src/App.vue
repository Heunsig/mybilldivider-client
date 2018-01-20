<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      dark
      fixed
    >
      <v-list>
        <v-list-tile tag="div">
          <v-list-tile-content>
            <v-list-tile-title>My Bill Divider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0">
        <v-divider light></v-divider>
        <v-list-tile v-for="item in nav" :key="item.label" @click="routerPush(item.name)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile-content>
          <!-- <v-list-tile-action>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action> -->
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed flat dense color="green" dark class="ics-toolbar">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><span v-if="!isHome">My Bill Divider</span></v-toolbar-title>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import eventBus from '@/event-bus'

export default {
  mounted () {
    let body = document.querySelector('body')
    eventBus.bodyElement = body
  },
  data () {
    return {
      drawer: false,
      nav: [
        {
          label: 'Home',
          name: 'home',
          icon: 'home'
        },
        {
          label: 'Calculator',
          name: 'calculator',
          icon: 'star'
        },
        {
          label: 'About me',
          name: 'aboutMe',
          icon: 'info'
        }
      ]
    }
  },
  computed: {
    isHome () {
      if (eventBus.currentRoute.name === 'home') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    routerPush (name) {
      this.$router.push({name: name})
      this.drawer = false
    }
  }
}
</script>
<style scoped>
  .ics-toolbar{
    z-index: 4;
  }
</style>
<style>
  .ics-cardDecoration{border-top:3px solid #4caf50;}

  .ics-dialog-title{
    font-weight: 500;
    font-size: 17px;
  }

  body.modal-open{
    position: fixed;
    width: 100%;
  }

  .overlay--active:before{opacity: 0.9;}
</style>
