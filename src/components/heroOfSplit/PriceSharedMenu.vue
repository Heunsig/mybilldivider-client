<template>
  <div>
    <v-btn 
      color="green"
      block
      dark
      @click="dialogAddingItem = true"
    >Add item</v-btn>
    <template v-if="menu.length">
      <v-container fluid class="ics-grid">
        <v-layout row wrap>
          <template v-for="(item, i) in menu">
            <v-flex xs12>
              <v-card class="ics-cardDecoration">
                <v-list>
                  <v-list-tile avatar class="ics-dashedBorder">
                    <v-list-tile-avatar>
                      <v-icon>local_dining</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.name || 'Unnamed' }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Total: $ {{ parseFloat(item.price).toFixed(2) }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogEditingItem(item)">
                        <v-icon color="grey">edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogDeletingItem(item)">
                        <v-icon color="grey">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-card flat>
                  <div class="ics-customSubheader">
                    <div class="green--text">Sharing people ({{item.people.length || 0}})</div>
                    <div v-if="item.people.length">Each person pay: $ {{ dividedPrice(item).toFixed(2) }}</div>
                  </div>
                  <v-card-text v-if="item.people.length">
                    <div class="text-xs-left">
                      <v-chip disabled label v-for="(name, i) in item.people" :key="i">{{ name }}</v-chip>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card-actions>
                  <v-btn icon small absolute bottom right dark fab color="green" @click="openDialogAddingPeople(item)" class="ics-floatingBtn">
                    <v-icon>person_add</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>              
            </v-flex>
          </template>
        </v-layout>
      </v-container>
      <v-btn 
        color="green"
        block
        dark
        class="mt-5"
        @click="dialogAddingItem = true"
      >Add item</v-btn>
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
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">Add Item</v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field 
                  label="Item name"
                  clearable
                  hide-details
                  prepend-icon="check"
                  v-model="item.name"
                ></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field 
                  label="Item price" 
                  type="number"
                  clearable
                  hide-details
                  prepend-icon="attach_money"
                  v-model="item.price"
                ></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="addItemToMenu">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditingItem" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">Edit Item</v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field 
                  label="Item name" 
                  clearable
                  hide-details
                  prepend-icon="check"
                  v-model="selectedItem.name"
                ></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field 
                  label="Item price"
                  type="number"
                  clearable
                  hide-details
                  prepend-icon="attach_money"
                  v-model="selectedItem.price"
                ></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="dialogEditingItem = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="dialogAddingPeople" scrollable persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">Add People</v-card-title>
        <v-card-text>
          <v-container fluid class="pl-0 pr-0 pt-0 pb-0">
            <v-layout row wrap>
              <v-flex xs12>
                <v-list>
                  <template v-for="(person, i) in people">
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-checkbox 
                        :key="i" 
                        :label="person.name || 'Unnamed - ' + i"
                        :value="person.name || 'Unnamed - ' + i"
                        v-model="selectedItem.people"
                        color="light-green"
                      ></v-checkbox>
                    </v-list-tile-content>
                  </v-list-tile>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="dialogAddingPeople = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDeletingItem">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
          Do you want to delete the item?
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="deleteItemFromMenu">Confirm</v-btn>
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
        this.dialogDeletingItem = false
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
  .ics-floatingBtn{z-index: 1!important;}
</style>