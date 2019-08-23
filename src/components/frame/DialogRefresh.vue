<template>
  <v-dialog 
    v-model="dialog" 
    persistent 
    max-width="290"
  >
    <v-card>
      <v-card-title 
        class="pb-3 pt-3 ics-dialog-title red darken-1 white--text"
      >
        Do you want to refresh all?<br/>
        It makes the app first state.
      </v-card-title>
      <v-card-actions>
        <v-btn 
          color="grey darken-2" 
          flat 
          block 
          @click.native="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn 
          color="red darken-1" 
          flat 
          block 
          @click.native="confirmToRefreshAll"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import EventBus from '../../event-bus'

  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
      },
      confirmToRefreshAll () {
        this.$store.commit('calculator/refreshAll')
        this.$store.commit('base/setPermissionToSeeResult', { bool: false })
        // this.activeDialog = {type: 'refreshAll', bool: false}
        this.$router.push({
          name: 'main'
        })
        this.closeDialog()
        // this.routerPush({name: 'main'})
      }
    },
    mounted () {
      EventBus.$on('OPEN_DIALOG_REFRESH', this.openDialog)
    }
  }
</script>