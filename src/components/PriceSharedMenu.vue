<template>
  <v-ons-page>
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

    <!-- Dialog for adding item -->
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
    <!-- /Dialog for adding item -->
  
    <!-- Dialog for adding people to item -->
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
    <!-- /Dialog for adding people to item -->
  </v-ons-page>
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
