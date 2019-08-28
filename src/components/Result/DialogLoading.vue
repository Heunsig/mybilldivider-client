<template>
  <v-dialog v-model="dialog" max-width="150">
    <v-card>
      <v-card-text class="text-xs-center">
        <v-progress-circular indeterminate v-bind:size="50" v-bind:width="4" color="green" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
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
      }
    }
  }
</script>