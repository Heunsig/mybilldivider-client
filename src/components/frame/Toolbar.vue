<template>
  <v-toolbar 
    app 
    fixed 
    flat 
    dense 
    dark 
    :class="[ backgroundSelector, shadowOnToolbar ]" 
    class="ics-toolbar"
  >

    <v-toolbar-side-icon 
      @click="toggleDrawer"
    />

    <v-toolbar-title>
      <span v-if="!isMain">
        {{ APP_NAME }}
        <span v-if="isTutorial" class="body-2">&nbsp;(Tutorial)</span>
      </span>
    </v-toolbar-title>
  </v-toolbar>
</template>
<script>
export default {
  props: [
    'toggleDrawer'
  ],
  computed: {
    isMain () {
      if (this.$route.name === 'main') {
        return true
      }

      return false
    },
    isTutorial () {
      if (this.$route.name === 'tutorial') {
        return true
      }

      if (this.$route.name === 'result' && this.$route.params.mode === 'tutorial') {
        return true
      }

      return false
    },
    backgroundSelector () {
      switch (this.$route.name) {
        case 'main':
          return 'grey darken-4'
        case 'tutorial':
          return 'blue'
        default:
          if (this.$route.name === 'result' && this.$route.params.mode === 'tutorial') {
            return 'blue'
          }

          return 'green'
      }
    },
    shadowOnToolbar () {
      if (
        this.$route.name !== 'main' &&
        this.$route.name !== 'tutorial' &&
        this.$route.name !== 'calculator'
      ) {
        return 'elevation-5'
      }
    }
  }
}
</script>
<style scoped>
  .ics-toolbar{
    z-index: 4;
  }
</style>