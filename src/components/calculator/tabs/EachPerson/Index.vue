<template>
  <div>
    <v-btn
      color="green" 
      dark
      block
      @click="openDialogAddingPerson()"
    >
      Add person
    </v-btn>
    <template v-if="people.length">
      <PeopleList 
        :openDialogEditingPerson="$refs.dialogEditingPerson.openDialog"
        :openDialogDeletingPerson="$refs.dialogDeletingPerson.openDialog"
      />

      <v-btn
        color="green" 
        dark
        block
        class="mt-5"
        @click="openDialogAddingPerson()"
      >
        Add person
      </v-btn>
    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5">
        No people are listed yet<br/>
        Add people by <span class="green--text">pushing the "ADD PERSON" button</span> above
      </div>
    </template>
    
    <DialogAddingPerson 
      ref="dialogAddingPerson"
    />

    <DialogEditingPerson 
      ref="dialogEditingPerson"
    />

    <v-dialog v-model="dialogs.item" scrollable persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          <template v-if="dialogMode == 'add'">Add an item you bought</template>
          <template v-else>Edit the Item you bought</template>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Input name (Optional)" 
            clearable
            hide-details
            prepend-icon="check"
            v-model="tempItem.name"
          ></v-text-field>
          <!-- <div class="ics-textField-detail">
            If you don't input a name, it'll go by the number of the person.
          </div> -->
          <v-text-field 
            ref="itemPriceForm"
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
          <template v-if="dialogMode == 'add'">
            <v-btn color="grey darken-2" flat block @click.native="closeDialogForItem">Cancel</v-btn>
            <v-btn color="light-green" flat block @click.native="confirmToAddItem">Confirm</v-btn>
          </template>
          <template  v-else> 
            <v-btn color="grey darken-2" flat block @click.native="closeDialogForItem">Cancel</v-btn>
            <v-btn color="light-green" flat block @click.native="confirmToEditItem">Confirm</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
    <DialogDeletingPerson 
      ref="dialogDeletingPerson"
    />
    <!-- <v-dialog persistent v-model="dialogs.deletingPerson" max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to delete the person?
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogDeletingPerson">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="confirmToDeletePerson">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
  <!-- /Section for dialog -->
</template>
<script>
  import PeopleList from './PeopleList'
  import DialogAddingPerson from './DialogAddingPerson'
  import DialogEditingPerson from './DialogEditingPerson'
  import DialogDeletingPerson from './DialogDeletingPerson'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import clone from 'lodash.clone'

  export default {
    components: {
      PeopleList,
      DialogAddingPerson,
      DialogEditingPerson,
      DialogDeletingPerson
    },
    mixins: [
      fixingModalBugInIphone
    ],
    data () {
      return {
        dialogs: {
          // addingPerson: false,
          editingPerson: false,
          deletingPerson: false,
          item: false
        },
        dialogMode: 'add',
        person: {},
        tempPerson: {
          name: '',
          tip: '',
          menu: []
        },
        item: {},
        tempItem: {
          name: '',
          price: '',
          taxable: true
        },
        orderForPerson: 0,
        orderForItem: 0
      }
    },
    computed: {
      people () {
        return this.$store.getters[this.$route.name + '/' + 'getPeople']
      }
    },
    methods: {
      // totalPriceWithoutSalesTax (person) {
      //   let total = 0

      //   person.menu.forEach(item => {
      //     total += item.price
      //   })

      //   return this.$format.precisionRound(total, 2)
      // },
      openDialogAddingPerson () {
        this.$refs.dialogAddingPerson.openDialog()
      },
      // closeDialogAddingPerson () {
      //   this.person = {}
      //   this.tempPerson = { name: '', tip: '', menu: [] }
      //   this.activeDialog = {type: 'addingPerson', bool: false}
      // },
      // confirmToAddPerson () {
      //   this.$store.commit(this.$route.name + '/' + 'addPerson', {person: this.__modifyPersonData(this.tempPerson)})

      //   this.person = {}
      //   this.tempPerson = { name: '', tip: '', menu: [] }
      //   this.activeDialog = {type: 'addingPerson', bool: false}
      // },
      // openDialogEditingPerson (person) {
        // this.person = person
        // this.tempPerson = clone(person)
        // // this.activeDialog = {type: 'editingPerson', bool: true, autofocus: 'personNameFormForEditing'}
        // this.activeDialog = {type: 'editingPerson', bool: true}
      // },
      // closeDialogEditingPerson () {
      //   this.person = {}
      //   this.tempPerson = {name: '', tip: '', menu: []}
      //   this.activeDialog = {type: 'editingPerson', bool: false}
      // },
      // confirmToEditPerson () {
      //   Object.assign(this.person, this.__modifyPersonData(this.tempPerson))

      //   this.person = {}
      //   this.tempPerson = {name: '', tip: '', menu: []}
      //   this.activeDialog = {type: 'editingPerson', bool: false}
      // },
      // openDialogDeletingPerson (person) {
      //   this.person = person
      //   this.activeDialog = {type: 'deletingPerson', bool: true}
      // },
      // confirmToDeletePerson () {
      //   this.$store.commit(this.$route.name + '/' + 'deletePersonFromPeople', {person: this.person})

      //   this.person = {}
      //   this.tempPerson = {name: '', tip: '', menu: []}
      //   this.activeDialog = {type: 'deletingPerson', bool: false}
      // },
      // closeDialogDeletingPerson () {
      //   this.person = {}
      //   this.tempPerson = {name: '', tip: '', menu: []}
      //   this.activeDialog = {type: 'deletingPerson', bool: false}
      // },
      openDialogForItem (person, item) {
        if (typeof item !== 'undefined') {
          this.dialogMode = 'edit'
          this.tempItem = clone(item)
          if (!this.tempItem.price) {
            this.tempItem.price = ''
          }
        } else {
          this.dialogMode = 'add'
          this.tempItem = {name: '', price: '', taxable: true}
        }

        this.person = person
        this.item = item
        this.activeDialog = {type: 'item', bool: true, autofocus: 'itemPriceForm'}
      },
      closeDialogForItem () {
        this.dialogMode = 'add'

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: true}
        this.activeDialog = {type: 'item', bool: false}
      },
      confirmToAddItem () {
        this.$store.commit(this.$route.name + '/' + 'addItemToPerson', {person: this.person, item: this.__modifyItemData(this.tempItem)})

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: true}
        this.activeDialog = {type: 'item', bool: false}
      },
      confirmToEditItem () {
        Object.assign(this.item, this.__modifyItemData(this.tempItem))

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: null}
        this.activeDialog = {type: 'item', bool: false}
      },
      confirmToRemoveItem (person, item) {
        person.menu.forEach((obj, i) => {
          if (obj === item) {
            person.menu.splice(i, 1)
          }
        })
      },
      __modifyPersonData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Person ' + this.orderForPerson++
        modifiedData.tip = modifiedData.tip || 0
        modifiedData.menu = modifiedData.menu || []

        return modifiedData
      },
      __modifyItemData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Item ' + this.orderForItem++
        modifiedData.price = this.$format.precisionRound(modifiedData.price, 2) || 0.00
        modifiedData.taxable = modifiedData.taxable

        return modifiedData
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  .ics-buttonEditingName{width: auto; height: auto;}
  .ics-buttonEditingName .icon{font-size: 17px;}

  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}
  .ics-subheader{height: 22px;}
  .ics-listActions{min-width: 35px;}

  .ics-floatingBtn{
    z-index: 1!important;
  }
  .ics-totalPrice{
    font-size: 17px;
    font-weight: 500;
  }
  .ics-msgNoItems{
    font-size: 14px;
  }

  .ics-textField-detail{
    padding-left:40px;
    padding-top: 5px;
    font-size: 13px;
    color: #717171;
  }
  
  .ics-msgNoItem-main{
    font-size:16px;
    color: #717171;
  }
  .test-a{
    /*position: absolute;*/
    border:1px solid red;
  }
</style>