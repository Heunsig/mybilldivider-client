<template>
  <div>
    <v-btn block color="primary" dark @click="dialogAddingItem = true">Add item</v-btn>
    <template v-if="menu.length">
      <v-container fluid class="ics-grid">
        <v-layout row wrap>
          <template v-for="(item, i) in menu">
            <v-flex xs12>
              <v-card>
                <v-list>
                  <v-list-tile avatar class="ics-dashedBorder">
                    <v-list-tile-avatar>
                      <v-icon>local_dining</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.name }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Total: $ {{ parseFloat(item.price).toFixed(2) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogEditingItem(item)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogDeletingItem(item)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-card flat>
                  <div class="ics-customSubheader">
                    <div>Sharing people ({{item.people.length || 0}})</div>
                    <div v-if="item.people.length">Each person pay: $ {{ dividedPrice(item).toFixed(2) }}</div>
                  </div>
                  <v-card-text v-if="item.people.length">
                    <div class="text-xs-left">
                      <v-chip disabled label v-for="(name, i) in item.people" :key="i">{{ name }}</v-chip>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card-actions>
                  <v-btn icon small absolute bottom right dark fab color="primary" @click="openDialogAddingPeople(item)" class="ics-floatingBtn">
                    <v-icon>person_add</v-icon>
                  </v-btn>
                </v-card-actions>
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
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="addItemToMenu">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditingItem" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit item</v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Item name" v-model="selectedItem.name"></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field label="Item price" type="number" v-model="selectedItem.price"></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialogEditingItem = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="dialogAddingPeople" scrollable persistent max-width="290">
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
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialogAddingPeople = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDeletingItem">
      <v-card>
        <v-card-title>Do you keep to delete the item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="deleteItemFromMenu">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
        dialogAddingPeople: false,
        dialogDeletingItem: false,
        dialogEditingItem: false
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
      addItemToMenu () {
        this.item.price = this.item.price || 0
        this.$store.commit('addItemToMenu', this.item)

        this.item = { name: '', price: '', people: [] }
        this.dialogAddingItem = false
      },
      openDialogAddingPeople (item) {
        this.selectedItem = item
        this.dialogAddingPeople = true
      },
      openDialogDeletingItem (item) {
        this.selectedItem = item
        this.dialogDeletingItem = true
      },
      openDialogEditingItem (item) {
        this.selectedItem = item
        this.dialogEditingItem = true
      },
      deleteItemFromMenu () {
        this.$store.commit('deleteItemFromMenu', this.selectedItem)
        this.selectedItem = {}
        this.dialogDeletingItem = false
      },
      closeDialog () {
        this.selectedItem = {}
        this.item = { name: '', price: '', people: [] }
        this.dialogAddingItem = false
        this.dialogAddingPeople = false
        this.dialogEditingItem = false
      },
      dividedPrice (item) {
        return item.price / (item.people.length || 1)
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}
  
  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}
  .ics-customSubheader{
    margin: 10px 0;
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }

  .ics-listActions{min-width: 35px;}
  .ics-floatingBtn{z-index: 1;}
</style>