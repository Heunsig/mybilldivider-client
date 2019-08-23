<template>
  <v-container fluid class="ics-grid">
    <v-layout row wrap>
      <template v-for="(person, i) in people">
        <Person 
          :person="person"
          :openDialogEditingPerson="openDialogEditingPerson"
          :openDialogDeletingPerson="openDialogDeletingPerson"
        />
      </template>
    </v-layout>
  </v-container>
</template>
<script>
  import Person from './Person'

  export default {
    props: [
      'openDialogEditingPerson',
      'openDialogDeletingPerson'
    ],
    components: {
      Person
    },
    computed: {
      people () {
        return this.$store.getters['calculator/getPeople']
      }
    }
  }
</script>