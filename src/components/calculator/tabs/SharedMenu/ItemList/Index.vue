<template>
  <v-container fluid class="ics-grid">
    <v-layout row wrap>
      <template v-for="(item, i) in menu">
        <Item 
          :item="item"
          :openDialogEditingItem="openDialogEditingItem"
          :openDialogEditingPeopleList="openDialogEditingPeopleList"
          :openDialogDeletingItem="openDialogDeletingItem"
        />
      </template>
    </v-layout>
  </v-container>
</template>
<script>
  import Item from './Item'

  export default {
    props: [
      'openDialogEditingItem',
      'openDialogEditingPeopleList',
      'openDialogDeletingItem'
    ],
    components: {
      Item
    },
    computed: {
      menu () {
        return this.$store.getters['calculator/getMenu']
      }
    }
  }
</script>
<style scoped>
  .ics-grid{padding: 3px;}
  .ics-grid > .layout:only-child{margin: -8px;}
  .ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}
</style>