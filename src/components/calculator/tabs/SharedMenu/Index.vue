<template>
  <div>
    <v-btn 
      color="green"
      block
      dark
      @click="openDialogAddingItem"
    >Add item</v-btn>
    <template v-if="menu.length">

      <ItemList 
        :menu="menu"
        :openDialogEditingItem="openDialogEditingItem"
        :openDialogEditingPeopleList="openDialogEditingPeopleList"
        :openDialogDeletingItem="openDialogDeletingItem"
      />
      
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
    
    
    <DialogAddingItem
      ref="dialogAddingItem"
      :convertItemData="convertItemData"
    />
  
    <DialogEditingItem 
      ref="dialogEditingItem"
      :convertItemData="convertItemData"
    />

    <DialogEditingPeopleList 
      ref="dialogEditingPeopleList"
      :people="people"
    />
    
    <DialogDeletingItem 
      ref="dialogDeletingItem"
    />
    
  </div>
</template>
<script>
  import ItemList from './ItemList'
  import DialogAddingItem from './DialogAddingItem'
  import DialogEditingItem from './DialogEditingItem'
  import DialogEditingPeopleList from './DialogEditingPeopleList'
  import DialogDeletingItem from './DialogDeletingItem'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import clone from 'lodash.clone'

  export default {
    components: {
      ItemList,
      DialogAddingItem,
      DialogEditingItem,
      DialogEditingPeopleList,
      DialogDeletingItem
    },
    mixins: [
      fixingModalBugInIphone
    ],
    computed: {
      menu () {
        return this.$store.getters[`${this.$route.name}/getMenu`]
      },
      people () {
        return this.$store.getters[`${this.$route.name}/getPeople`]
      },
      orderForItem () {
        return this.$store.getters[`${this.$route.name}/getOrderForItem`]
      }
    },
    methods: {
      openDialogAddingItem () {
        this.$refs.dialogAddingItem.openDialog()
      },
      openDialogEditingItem (item) {
        this.$refs.dialogEditingItem.openDialog(item)
      },
      openDialogEditingPeopleList (item) {
        this.$refs.dialogEditingPeopleList.openDialog(item)
      },
      openDialogDeletingItem (item) {
        this.$refs.dialogDeletingItem.openDialog(item)
      },
      convertItemData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Shared item ' + this.orderForItem
        modifiedData.price = this.$format.precisionRound(modifiedData.price, 2) || 0.00
        modifiedData.taxable = modifiedData.taxable
        modifiedData.people = modifiedData.people || []

        return modifiedData
      }
    }
  }
</script>
<style scoped>
  /*.container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}*/
  
  /*.ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}*/
  /*.ics-customSubheader{
    margin: 10px 0;
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }*/

  /*.ics-listActions{min-width: 35px;}*/
  /*.ics-floatingBtn{z-index: 1!important;}*/

  /*.ics-msgNoItems{
    font-size: 14px;
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
  }*/
  
  .ics-msgNoItem-main {
    font-size:16px;
    color: #717171;
  }

</style>