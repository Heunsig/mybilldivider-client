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
  <!-- <v-ons-page>
    <div style="background:white;padding: 5px 0;text-align:center;">
      <v-ons-button @click.native="dialog = true" style="width:90%">Add person</v-ons-button>
    </div>
    <div v-if="people.length">
      <v-ons-list>
        <v-ons-list-header>People who eat togehter</v-ons-list-header>
          <v-ons-list-item v-for="(person, index) in people" :key="index">
            <div class="left">
              <v-ons-icon icon="ion-ios-person"></v-ons-icon>
            </div>
            <div class="center">
              {{ person.name }}
            </div>
          </v-ons-list-item>
      </v-ons-list>  
    </div>
    <div v-else>
      <p style="text-align:center;">
        No People
      </p>
    </div>
    
    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="dialog"
    >
      <span slot="title">Add New Person</span>
      <p>
        <v-ons-input placeholder="Input your name" float
          v-model="person.name"
        >
        </v-ons-input>
      </p>
      <template slot="footer">
        <button class="alert-dialog-button" @click="closeDialog">Cancel</button>
        <button class="alert-dialog-button" @click="addPerson">Ok</button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page> -->
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