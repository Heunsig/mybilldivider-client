<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        <template v-if="mode == 'add'">Add an item you bought</template>
        <template v-else>Edit the Item you bought</template>
      </v-card-title>
      <v-card-text>
        <v-text-field 
          label="Input name (Optional)" 
          clearable
          hide-details
          prepend-icon="check"
          v-model="name"
        ></v-text-field>
        <v-text-field 
          ref="itemPriceForm"
          label="Input price" 
          type="number" 
          clearable
          hide-details
          prepend-icon="attach_money"
          v-model="price"
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
                :label="taxable ? 'Taxable':'Non-taxable'"
                v-model="taxable"
                color="orange"
                hide-details>
              </v-switch>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <template v-if="mode == 'add'">
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToAddItem">Confirm</v-btn>
        </template>
        <template  v-else> 
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToEditItem">Confirm</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        mode: 'add',
        person: {},
        item: {},
        name: '',
        price: '',
        taxable: true
      }
    },
    computed: {
      orderForItem () {
        return this.$store.getters['calculator/getOrderForItem']
      }
    },
    methods: {
      openDialog (person, item) {
        if (typeof item !== 'undefined') {
          this.mode = 'edit'
          this.item = item
          this.name = item.name
          this.price = item.price
          this.taxable = item.taxable
        } else {
          this.mode = 'add'
        }
        this.person = person
        this.dialog = true
      },
      closeDialog () {
        this.mode = 'add'
        this.person = {}
        this.item = {}
        this.name = ''
        this.price = ''
        this.taxable = true
        this.dialog = false
      },
      confirmToAddItem () {
        this.$store.commit('calculator/addItemToPerson', {
          person: this.person,
          item: this.__modifyItemData({
            name: this.name,
            price: this.price,
            taxable: this.taxable
          })
        })

        this.closeDialog()
      },
      confirmToEditItem () {
        Object.assign(this.item, this.__modifyItemData({
          name: this.name,
          price: this.price,
          taxable: this.taxable
        }))

        this.closeDialog()
      },
      __modifyItemData (pureData) {
        let modifiedData = pureData

        modifiedData.name = modifiedData.name || 'Item ' + this.orderForItem
        modifiedData.price = this.$format.precisionRound(modifiedData.price, 2) || 0.00
        modifiedData.taxable = modifiedData.taxable

        return modifiedData
      }
    }
  }
</script>