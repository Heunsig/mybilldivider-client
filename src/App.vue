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
        <!-- <v-subheader>Navigation Menu</v-subheader> -->
        <!-- <v-divider light></v-divider> -->
        <template v-for="item in nav">
          <v-list-tile :key="item.label" @click="routerPush(item.name) ">
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
        </template>
      </v-list>
      <v-list>
        <v-subheader>Function</v-subheader>
        <template v-for="item in navForFunction">
          <v-divider></v-divider>
          <v-list-tile :key="item.label" @click="item.dialog ? openDialog(item.dialog) : ''">
            <v-list-tile-action>
              <v-icon class="light-green--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-list-tile-title class="light-green--text text--darken-1">{{ item.label }}</v-list-tile-title>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed flat dense color="green" dark class="ics-toolbar">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><span v-if="!isMain">My Bill Divider</span></v-toolbar-title>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <router-view></router-view>
    </v-content>

    <v-dialog persistent v-model="dialogs.refreshAll">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
          Do you want to refresh all?<br/>
          It makes the app first state.
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="activeDialog = {type: 'refreshAll', bool: false}">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="confirmToRefreshAll">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import eventBus from '@/event-bus'
import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

export default {
  mixins: [fixingModalBugInIphone],
  mounted () {
    let body = document.querySelector('body')
    eventBus.bodyElement = body
  },
  data () {
    return {
      drawer: false,
      nav: [
        {
          label: 'Main',
          name: 'main',
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
        // {
        //   label: 'Refresh',
        //   name: 'refresh',
        //   icon: 'refresh',
        //   dialog: 'refreshAll'
        // }
      ],
      navForFunction: [
        {
          label: 'Refresh',
          // name: 'refresh',
          icon: 'refresh',
          dialog: 'refreshAll'
        }
      ],
      dialogs: {
        refreshAll: false
      }
    }
  },
  computed: {
    isMain () {
      if (eventBus.currentRoute.name === 'main') {
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
    },
    openDialog (dialog) {
      this.activeDialog = {type: dialog, bool: true}
    },
    confirmToRefreshAll () {
      this.$store.commit('refreshAll')
      this.activeDialog = {type: 'refreshAll', bool: false}
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

  .ics-button-smaller {
    width: 25px!important;
    height: 25px!important;;
  }
  .ics-align-center {
    align-items: center;
  }
</style>
