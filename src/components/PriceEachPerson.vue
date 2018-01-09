<template>
  <div>
    <template v-for="(person, i) in people">
      <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon class="grey lighten-1 white--text">person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ person.name }}</v-list-tile-title>
              <v-list-tile-sub-title>Total: $ {{ totalPriceWithoutSalesTax(person).toFixed(2) }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="openDialog(person)">
                <v-icon color="grey lighten-1">add_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile avatar v-for="(item, i) in person.menu" :key="i">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}  </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            $ {{ parseFloat(item.price).toFixed(2) }}
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple @click="openDialog(person, item)">
              <v-icon color="grey lighten-1">edit</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider v-if="i != people.length - 1"></v-divider>
    </template>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          <template v-if="dialogMode == 'add'">Add item</template>
          <template v-else>Edit item</template>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Item name" v-model="item.name"></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field label="Item price" type="number" v-model="item.price"></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="dialogMode == 'add'">
            <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click.native="addItemToMenu">Agree</v-btn>
          </template>
          <template  v-else> 
            <v-btn color="green darken-1" flat @click.native="editItemInMenu">Agree</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- <v-ons-page>
    <div v-if='people.length'>
      <v-ons-list>
        <div v-for="(person, index) in people" :key="index">
          <v-ons-list-header>A person who eats togehter</v-ons-list-header>
          <v-ons-list-item>
            <div class="left">
              <v-ons-icon icon="ion-ios-person" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
              <span class="list-item__title">{{ person.name }}</span>
              <span class="list-item__subtitle">Total: $ {{ totalPriceWithoutSalesTax(person).toFixed(2) }}</span>
            </div>
            <div class="right">
              <v-ons-button modifier="quiet" @click.native="addItemToMenu(person)">Add price</v-ons-button>  
            </div>
          </v-ons-list-item>
          <div v-for="(item, index) in person.menu" :key="index" style="border:bottom:1px solid red;">
            <v-ons-list-item modifier="nodivider">
              <div class="left">
                <v-ons-icon icon="ion-social-usd"></v-ons-icon>
              </div>
              <div class="center">
                <v-ons-row>
                  <v-ons-col style="margin-right:8px;">
                    <v-ons-input placeholder="Item name" v-model="item.name"></v-ons-input>
                  </v-ons-col>
                  <v-ons-col width="40%">
                    <v-ons-input placeholder="Item price" type="number" v-model="item.price"></v-ons-input>
                  </v-ons-col>
                </v-ons-row>
              </div>
            </v-ons-list-item>
          </div>
        </div>
      </v-ons-list>
    </div>
    <div v-else>
      <p style="text-align:center;">
        Please add people first
      </p>
    </div>
  </v-ons-page> -->
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        dialogMode: 'add',
        person: {},
        item: {
          name: '',
          price: ''
        }
      }
    },
    computed: {
      people () {
        return this.$store.getters.getPeople
      }
    },
    methods: {
      openDialog (person, item) {
        if (typeof item !== 'undefined') {
          this.dialogMode = 'edit'
          this.item = item
        } else {
          this.dialogMode = 'add'
        }

        this.person = person
        this.dialog = true
      },
      closeDialog () {
        this.dialogMode = 'add'
        this.person = {}
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      addItemToMenu () {
        // let item = {
        //   name: '',
        //   price: ''
        // }

        this.person.menu.push(this.item)
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      editItemInMenu () {
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      totalPriceWithoutSalesTax (person) {
        let total = 0

        person.menu.forEach(item => {
          total += parseFloat(item.price) || 0
        })

        return total
      }
    }
  }
</script>