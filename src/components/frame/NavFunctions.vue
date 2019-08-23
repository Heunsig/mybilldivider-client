<template>
  <v-list dense>
    <v-subheader>Function</v-subheader>
    <template v-for="item in items">
      <v-list-tile 
        :key="item.label" 
        @click="item.dialog ? item.dialog() : null"
      >
        <v-list-tile-action>
          <v-icon class="light-green--text">
            {{ item.icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-list-tile-title class="light-green--text text--darken-1">
            {{ item.label }}
          </v-list-tile-title>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>
<script>
  import EventBus from '../../event-bus'

  export default {
    data () {
      return {
        items: [
          {
            label: 'Refresh',
            icon: 'refresh',
            dialog: this.openDialogRefresh
          }
        ]
      }
    },
    methods: {
      openDialogRefresh () {
        EventBus.$emit('OPEN_DIALOG_REFRESH')
      }
    }
  }
</script>