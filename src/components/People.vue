<template>
  <div>
    <v-btn block color="primary" dark @click="dialog = true">Add person</v-btn>
    <template v-if="people.length">
      <v-list>
        <template v-for="(person, i) in people">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="grey lighten-1 white--text">person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ person.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="i != people.length - 1"></v-divider>
        </template>
      </v-list>
    </template>
    <template v-else>
      <v-card flat>
        <v-card-text>
          <p class="text-xs-center body-2">Please add people</p>
        </v-card-text>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Add person</v-card-title>
        <v-card-text>
          <v-text-field label="Input name" v-model="person.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="addPerson">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        person: {
          name: '',
          tip: '',
          menu: []
        },
        dialog: false
      }
    },
    computed: {
      people () {
        return this.$store.getters.getPeople
      }
    },
    methods: {
      addPerson () {
        this.$store.commit('addPerson', this.person)

        this.person = { name: '', tip: '', menu: [] }
        this.dialog = false

        console.log(this.people)
      },
      closeDialog () {
        this.person = { name: '', tip: '', menu: [] }
        this.dialog = false
      }
    }
  }
</script>