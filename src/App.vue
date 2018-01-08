<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        I can split
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable
      :tabs="tabs"
    >
    </v-ons-tabbar>

  </v-ons-page>
</template>

<script>
import Home from '@/components/Home'
import People from '@/components/People'
import PriceEachPerson from '@/components/PriceEachPerson'
import PriceSharedMenu from '@/components/PriceSharedMenu'
import Result from '@/components/Result'

export default {
  data () {
    return {
      // salesTaxRate: '',
      // people: [],
      // person: {
        // name: '',
        // menu: []
      // },
      // dialogAddPerson: false,
      tabs: [
        {
          icon: 'ion-home',
          label: 'Home',
          page: Home,
          key: 'home'
        },
        {
          icon: 'ion-ios-person',
          label: 'People',
          page: People,
          key: 'addPeople'
        },
        {
          icon: 'ion-ios-paper',
          label: 'In person',
          page: PriceEachPerson,
          key: 'managePeople'
        },
        {
          icon: 'ion-pizza',
          label: 'In Menu',
          page: PriceSharedMenu,
          key: 'sharedMenu'
        },
        {
          icon: 'ion-social-usd',
          label: 'Result',
          page: Result,
          key: 'resultPage'
        }
      ]
    }
  },
  methods: {
    // openDialogAddingPerson () {
    //   this.person = {
    //     name: '',
    //     menu: []
    //   }
    //   this.dialogAddPerson = true
    // },
    // confirmAddingPerson () {
    //   this.people.push(this.person)
    //   this.dialogAddPerson = false
    // },
    // closeAddingPerson () {
    //   this.person = {
    //     name: '',
    //     menu: []
    //   }
    //   this.dialogAddPerson = false
    // },
    // addMenu (person) {
    //   person.menu.push({price: ''})
    // }
  }
}
</script>

<style>
</style>
