<template>
  <v-ons-page>
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
  </v-ons-page>
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