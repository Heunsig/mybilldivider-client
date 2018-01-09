<template>
  <div>
    <v-btn block color="primary" dark @click="dialogAddingItem = true">Add item</v-btn>
    <template v-if="menu.length">
      <v-container fluid grid-list-xs>
        <v-layout row wrap>
          <template v-for="(item, i) in menu">
            <v-flex xs12>
              <v-card>
                <v-card-text>
                  <v-list>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <v-icon class="grey lighten-1 white--text">local_dining</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                        <!-- <v-list-tile-sub-title>Total: $ {{ totalPriceWithoutSalesTax(person).toFixed(2) }}</v-list-tile-sub-title> -->
                      </v-list-tile-content>
                      <v-list-tile-action>
                        $ {{ item.price }}
                      </v-list-tile-action>
                      <v-list-tile-action>
                        <v-btn icon ripple @click="">
                          <v-icon color="grey lighten-1">edit</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                  <v-card flat>
                    <v-card-text>
                      <div class="text-xs-center">
                        <v-chip label v-for="(name, i) in item.people" :key="i">{{ name }}</v-chip>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn flat @click="openDialogAddingPeople(item)">
                          With
                      </v-btn>
                    </v-card-actions>
                  </v-card>
      <!-- <v-divider v-if="i != menu.length - 1"></v-divider> -->
                </v-card-text>
              </v-card>              
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </template>
    <template v-else>
      <v-card flat>
        <v-card-text>
          <p class="text-xs-center body-2">Please add item</p>
        </v-card-text>
      </v-card>
    </template>

    <v-dialog v-model="dialogAddingItem" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Add item</v-card-title>
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
          <v-btn color="green darken-1" flat @click.native="closeDialogAddingItem">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="addItem">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddingPeople" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Add People</v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-checkbox v-for="(person, i) in people" :key="i" :label="person.name" v-model="selectedItem.people" :value="person.name"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" flat @click.native="dialogAddingPeople = false">Disagree</v-btn> -->
          <v-btn color="green darken-1" flat @click.native="dialogAddingPeople = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- <v-ons-page>
    <div style="background:white;padding: 5px 0;text-align:center;">
      <v-ons-button @click.native="dialogAddingItem = true" style="width:90%">Add menu</v-ons-button>
    </div>
    <div v-if="menu.length">
      <v-ons-list>
        <div v-for="(item, index) in menu" :key="index">
          <v-ons-list-header>Item</v-ons-list-header>
          <v-ons-list-item>
            <div class="center">
              <span class="list-item__title">{{ item.name }}</span>
              <span class="list-item__subtitle">$ {{ item.price }}</span>
            </div>
            <div class="right">
              <v-ons-button @click="openDialogAddingPeople(item)">With</v-ons-button>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">
              <span v-for="(name, index) in item.people" :key="index" style="padding:3px;">{{ name }}{{ item.people.length - 1 !== index ? ',' : '' }}</span>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="right">$ {{ splitPrice(item).toFixed(2) }}</div>
          </v-ons-list-item>
        </div>
      </v-ons-list>
    </div>
    <div v-else>
      <p style="text-align:center;">
        No menu
      </p>
    </div>

    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="dialogAddingItem"
    >
      <span slot="title">Add New Item</span>
      <p>
        <v-ons-input placeholder="Input name (Optional)" float
          v-model="item.name"
        ></v-ons-input>
      </p>
      <p>
        <v-ons-input placeholder="Input price" type="number" float
          v-model="item.price"
        ></v-ons-input>
      </p>
      <template slot="footer">
        <button class="alert-dialog-button" @click="closeDialogAddingItem">Cancel</button>
        <button class="alert-dialog-button" @click="addItem">Ok</button>
      </template>
    </v-ons-alert-dialog>
  
    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="dialogAddingPeople"
    >
      <span slot="title">With</span>
      
      <v-ons-list>
        <v-ons-list-item v-for="(person, index) in people" :key="index">
          <label class="left">
            <v-ons-checkbox
              :input-id="'checkbox-' + index"
              :value="person.name"
              v-model="selectedItem.people"
            >
            </v-ons-checkbox>
          </label>
          <label class="center" :for="'checkbox-' + index">
            {{ person.name }}
          </label>
        </v-ons-list-item>
      </v-ons-list>
      
      <template slot="footer">
        <button class="alert-dialog-button" @click="dialogAddingPeople = false">Ok</button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page> -->
</template>
<script>
  export default {
    data () {
      return {
        item: {
          name: '',
          price: '',
          people: []
        },
        selectedItem: {},
        dialogAddingItem: false,
        dialogAddingPeople: false
      }
    },
    computed: {
      menu () {
        return this.$store.getters.getMenu
      },
      people () {
        return this.$store.getters.getPeople
      },
      peopleNameList () {
        let nameList = []
        this.$store.getters.getPeople.forEach(person => {
          nameList.push(person.name)
        })

        return nameList
      }
    },
    methods: {
      addItem () {
        this.$store.commit('addMenu', this.item)

        this.item = { name: '', price: '', people: [] }
        this.dialogAddingItem = false
      },
      closeDialogAddingItem () {
        this.item = { name: '', price: '', people: [] }
        this.dialogAddingItem = false
      },
      openDialogAddingPeople (item) {
        this.selectedItem = item
        this.dialogAddingPeople = true
      },
      splitPrice (item) {
        return item.price / (item.people.length || 1)
      }
    }
  }
</script>
