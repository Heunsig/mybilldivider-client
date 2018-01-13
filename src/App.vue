<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      dark
      fixed
    >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Hero of Split</v-list-tile-title>
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
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed flat dense color="green" dark class="ics-toolbar">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hero of Split</v-toolbar-title>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      nav: [
        {
          label: 'Calculator',
          name: 'home',
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
  methods: {
    routerPush (name) {
      this.$router.push({name: name})
      this.drawer = false
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
</style>