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
        :openDialogAddingItem="$refs.dialogAddingItem.openDialog"
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

    <DialogDeletingPerson 
      ref="dialogDeletingPerson"
    />

    <DialogAddingItem 
      ref="dialogAddingItem"
    />
  </div>
  <!-- /Section for dialog -->
</template>
<script>
  import PeopleList from './PeopleList'
  import DialogAddingPerson from './DialogAddingPerson'
  import DialogEditingPerson from './DialogEditingPerson'
  import DialogDeletingPerson from './DialogDeletingPerson'
  import DialogAddingItem from './DialogAddingItem'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    components: {
      PeopleList,
      DialogAddingPerson,
      DialogEditingPerson,
      DialogDeletingPerson,
      DialogAddingItem
    },
    mixins: [
      fixingModalBugInIphone
    ],
    data () {
      return {}
    },
    computed: {
      people () {
        return this.$store.getters['calculator/getPeople']
      }
    },
    methods: {
      openDialogAddingPerson () {
        this.$refs.dialogAddingPerson.openDialog()
      }
    }
  }
</script>
<style scoped>
  /*.container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}*/

  .ics-buttonEditingName{width: auto; height: auto;}
  .ics-buttonEditingName .icon{font-size: 17px;}

  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}
  .ics-subheader{height: 22px;}
  .ics-listActions{min-width: 35px;}

  /*.ics-floatingBtn{
    z-index: 1!important;
  }*/
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