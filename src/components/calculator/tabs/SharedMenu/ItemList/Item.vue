<template>
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
          <div class="green--text">People who shared ({{item.people.length || 0}})</div>
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
<script>
  export default {
    props: [
      'item',
      'openDialogEditingItem',
      'openDialogEditingPeopleList',
      'openDialogDeletingItem'
    ],
    methods: {
      dividedPrice (item) {
        return this.$format.precisionRound((item.price / (item.people.length || 1)), 2)
      }
    }
  }
</script>
<style scoped>
  .ics-dashedBorder {
    border-bottom:1px dashed #d6d6d6;
  }
  .ics-customSubheader{
    margin: 10px 0;
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }
  .ics-listActions {
    min-width: 35px;
  }
  .ics-floatingBtn{z-index: 1!important;}
  .ics-msgNoItems{
    font-size: 14px;
  }

  /*.ics-msgNoItem-main{
    font-size:16px;
    color: #717171;
  }*/

  /*.ics-textField-detail{
    padding-left:40px;
    padding-top: 5px;
    font-size: 13px;
    color: #717171;
  }*/

  .ics-totalPrice {
    font-size: 17px;
    font-weight: 500;
  }
</style>