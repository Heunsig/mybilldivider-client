<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="290">
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
          v-model="name"
        ></v-text-field>      
        <v-text-field
          ref="itemPriceFormForAdding"
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
        <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
        <v-btn color="light-green" flat block @click.native="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: [
      'convertItemData'
    ],
    data () {
      return {
        dialog: false,
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
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        this.name = ''
        this.price = ''
        this.taxable = true
      },
      confirm () {
        this.$store.commit('calculator/addItemToMenu', this.convertItemData({
          name: this.name,
          price: this.price,
          taxable: this.taxable
        }))

        this.closeDialog()
      }
    }
  }
</script>