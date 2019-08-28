<template>
  <v-container fluid class="ics-grid">
    <v-layout row wrap>
      <template v-for="(person, i) in people">
        <Person 
          :person="person"
          :openDialogEditingPerson="openDialogEditingPerson"
          :openDialogDeletingPerson="openDialogDeletingPerson"
          :openDialogAddingItem="openDialogAddingItem"
        />
      </template>
    </v-layout>
  </v-container>
</template>
<script>
  import Person from './Person'

  export default {
    props: [
      'people',
      'openDialogEditingPerson',
      'openDialogDeletingPerson',
      'openDialogAddingItem'
    ],
    components: {
      Person
    }
  }
</script>
<style scoped>
  .ics-grid{padding: 3px;}
  .ics-grid > .layout:only-child{margin: -8px;}
  .ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}
</style>