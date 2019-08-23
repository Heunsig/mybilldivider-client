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
            <v-list-tile-title>{{ APP_NAME }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn 
              icon
              @click.stop="toggleDrawer"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <NavMain />

      <v-divider></v-divider>

      <NavInfo />

      <NavFunctions />

    </v-navigation-drawer>

    <Toolbar 
      :toggleDrawer="toggleDrawer"
    />

    <v-content class="grey lighten-4">
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    
    <DialogRefresh />
  </v-app>
</template>
<script>
  import Toolbar from './components/frame/Toolbar'
  import NavMain from './components/frame/NavMain'
  import NavInfo from './components/frame/NavInfo'
  import NavFunctions from './components/frame/NavFunctions'
  import DialogRefresh from './components/frame/DialogRefresh'
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    mixins: [
      fixingModalBugInIphone
    ],
    components: {
      Toolbar,
      NavMain,
      NavInfo,
      NavFunctions,
      DialogRefresh
    },
    data () {
      return {
        drawer: false
      }
    },
    methods: {
      toggleDrawer (e) {
        this.drawer = !this.drawer
      }
    }
  }
</script>
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

  .ics-spacer-taxableSelector {
    flex-grow: 0.6!important;
  }

  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}
  .ics-dashedBorder-top{border-top:1px dashed #d6d6d6;}
  .ics-card-title {
    font-size:15px;
    font-weight:500;
  }

  .ics-button-in-content {
    width: 22px!important;
    height: 22px!important;
    margin:2px!important;
  }
  .ics-button-in-content > .btn__content {
    height: auto!important;
  }
  .ics-button-in-content > .btn__content > i {
    font-size:12px!important;
  }
    
  .ics-ol > li{
    margin:10px 0;
  }

  .ics-button-nav {
    z-index: 2!important;
  }
</style>
