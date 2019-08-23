<template>
  <v-flex xs12 class="mb-3">
    <v-card class="ics-cardDecoration">
      <v-list>
        <v-list-tile avatar class="ics-dashedBorder">
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ person.name }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action class="ics-listActions">
              <v-btn icon @click="openDialogEditingPerson(person)">
                <v-icon color="grey">edit</v-icon>
              </v-btn>
           </v-list-tile-action>
           <v-list-tile-action class="ics-listActions">
            <v-btn icon @click="openDialogDeletingPerson(person)">
              <v-icon color="grey">delete</v-icon>
            </v-btn>
           </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-subheader class="ics-subheader green--text">Added items ({{person.menu.length || 0}})</v-subheader>
        <template v-if="person.menu.length">
          <v-list-tile v-for="(item, i) in person.menu" :key="i">
            <v-list-tile-action class="ics-listActions">
              <v-btn icon small @click="confirmToRemoveItem(person, item)">
                <v-icon small color="red lighten-3">close</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }} <span class="caption red--text">{{ item.taxable ? '':'No tax' }}</span></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              {{ $accounting.formatMoney(item.price) }}
            </v-list-tile-action>
            <v-list-tile-action class="ics-listActions">
              <v-btn icon small @click="openDialogForItem(person, item)">
                <v-icon small color="grey lighten-2">edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
        <template v-else>
          <li class="ics-msgNoItems text-xs-center pt-3 grey--text text--darken-2 pa-3">
            No items are listed yet<br/>
            <span class="orange--text">Push the orange button</span> to add items
            <!-- Add items you bought. -->
          </li>
        </template>
      </v-list>
      <v-card flat>
        <v-card-text class="text-xs-right pt-1">
          <span class="ics-totalPrice">Total: {{ $accounting.formatMoney(getTotalPriceWithoutSalesTax(person)) }}</span>
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn icon small absolute bottom right dark fab color="orange" @click="openDialogForItem(person)" class="ics-floatingBtn">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    props: [
      'person',
      'openDialogEditingPerson',
      'openDialogDeletingPerson'
    ],
    methods: {
      getTotalPriceWithoutSalesTax (person) {
        let total = 0

        person.menu.forEach(item => {
          total += item.price
        })

        return this.$format.precisionRound(total, 2)
      }
    }
  }
</script>