<template>
  <div>
    <v-btn 
      color="green"
      block
      dark
      @click="openDialogAddingItem"
    >Add item</v-btn>
    <template v-if="menu.length">
      <v-container fluid class="ics-grid">
        <v-layout row wrap>
          <template v-for="(item, i) in menu">
            <v-flex xs12 class="mb-3">
              <v-card class="ics-cardDecoration">
                <v-list>
                  <v-list-tile avatar class="ics-dashedBorder">
                    <v-list-tile-avatar>
                      <v-icon>local_dining</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.name }} <span class="caption red--text">{{ item.taxable? '':'No tax' }}</span>
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Price: {{ $accounting.formatMoney(item.price) }}</v-list-tile-sub-title>
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
                  </div>
                  <v-card-text v-if="item.people.length">
                    <div class="text-xs-left">
                      <v-chip disabled label v-for="(name, i) in item.people" :key="i">{{ name }}</v-chip>
                    </div>
                  </v-card-text>
                  <v-card-text v-else class="ics-msgNoItems text-xs-center">
                    No people are selected yet<br/>
                    <span class="orange--text">Push the orange button</span> to add people shared with
                    <!-- Add people shared with -->
                  </v-card-text>
                </v-card>
                <v-card flat v-if="item.people.length">
                  <v-card-text class="text-xs-right pt-1">
                    <span class="ics-totalPrice">Each person pay: {{ $accounting.formatMoney(dividedPrice(item)) }}</span>
                  </v-card-text>
                </v-card>
                <v-card-actions>
                  <v-btn icon small absolute bottom right dark fab color="orange" @click="openDialogEditingPeopleList(item)" class="ics-floatingBtn">
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
        @click="openDialogAddingItem"
      >Add item</v-btn>
    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5">
        No items are listed yet<br/>
        Add items by <span class="green--text">pushing the "ADD ITEM" button</span> above
      </div>
    </template>
    
    <!-- Section for dialog -->
    <v-dialog v-model="dialogs.addingItem" scrollable persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        Add an item shared with others
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Input name (Optional)"
            clearable
            hide-details
            prepend-icon="check"
            v-model="tempItem.name"
          ></v-text-field>      
          <div class="ics-textField-detail">
            If you don't input the name, it'll go by the item number.
          </div>
          <v-text-field
            ref="itemPriceFormForAdding"
            label="Input price" 
            type="number"
            clearable
            hide-details
            prepend-icon="attach_money"
            v-model="tempItem.price"
          ></v-text-field>
          <v-container class="pa-0 pt-2">
            <v-layout row warp>
              <v-flex offset-xs4 xs1 class="mr-2">
                <v-menu
                  offset-y
                >
                  <v-btn slot="activator" class="ma-0" small icon><v-icon color="grey">info</v-icon></v-btn>
                  <v-card>
                    <v-card-text>
                      Select item is taxable or non-taxable.
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-flex>
              <v-flex xs7>
                <v-switch
                  :label="tempItem.taxable ? 'Taxable':'Non-taxable'"
                  v-model="tempItem.taxable"
                  color="orange"
                  hide-details>
                </v-switch>
              </v-flex>
            </v-layout>
          </v-container>    
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogAddingItem">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToAddItem('addItemToMenu')">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogs.editingItem" scrollable persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">Edit the item shared with others</v-card-title>
        <v-card-text>
          <v-text-field 
            label="Item name" 
            clearable
            hide-details
            prepend-icon="check"
            v-model="tempItem.name"
          ></v-text-field>      
          <v-text-field
            ref="itemPriceFormForEditing"
            label="Item price"
            type="number"
            clearable
            hide-details
            prepend-icon="attach_money"
            v-model="tempItem.price"
          ></v-text-field>
          <v-container class="pa-0 pt-2">
            <v-layout row warp>
              <v-flex offset-xs4 xs1 class="mr-2">
                <v-menu
                  offset-y
                >
                  <v-btn slot="activator" class="ma-0" small icon><v-icon color="grey">info</v-icon></v-btn>
                  <v-card>
                    <v-card-text>
                      Select item is taxable or non-taxable.
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-flex>
              <v-flex xs7>
                <v-switch
                  :label="tempItem.taxable ? 'Taxable':'Non-taxable'"
                  v-model="tempItem.taxable"
                  color="orange"
                  hide-details>
                </v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogEditingItem">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToEditItem">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="dialogs.editingPeopleList" scrollable persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          Select People<br/>who shared the item
        </v-card-title>
        <v-card-text>
          <v-container fluid class="pl-0 pr-0 pt-0 pb-0">
            <v-layout row wrap>
              <v-flex xs12>
                <v-list>
                  <template v-if="people.length">
                  <v-list-tile v-for="(person, i) in people" :key="i">
                    <v-list-tile-content>
                      <v-checkbox 
                        :key="i" 
                        :label="person.name"
                        :value="person.name"
                        v-model="tempItem.people"
                        color="light-green"
                      ></v-checkbox>
                    </v-list-tile-content>
                  </v-list-tile>
                  </template>
                  <template v-else>
                    <li class="ics-msgNoItems text-xs-center grey--text text--darken-2">
                      No people are listed yet<br/>
                      Add people first at "EACH PERSON" tab
                    </li>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-green" flat block @click.native="confirmToEditPeopleList">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="dialogs.deletingItem">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
          Do you want to delete the item?
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogDeletingItem">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="confirmToDeleteItem('deleteItemFromMenu')">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import sharedItems from '@/mixins/calculator/sharedItems'

  export default {
    mixins: [
      fixingModalBugInIphone,
      sharedItems
    ],
    computed: {
      menu () {
        return this.$store.getters.getMenu
      },
      people () {
        return this.$store.getters.getPeople
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

  .ics-msgNoItems{
    /*padding: 5px 16px;*/
    /*color: #717171; */
    font-size: 14px;
    /*font-weight: 500;*/
    /*text-align:center;*/
  }

  .ics-msgNoItem-main{
    font-size:16px;
    color: #717171;
  }

  .ics-textField-detail{
    padding-left:40px;
    padding-top: 5px;
    font-size: 13px;
    color: #717171;
  }

  .ics-totalPrice{
    font-size: 17px;
    font-weight: 500;
  }


</style>