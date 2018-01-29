import clone from 'lodash.clone'

export default {
  data () {
    return {
      dialogs: {
        addingItem: false,
        editingPeopleList: false,
        deletingItem: false,
        editingItem: false
      },
      tempItem: {
        name: '',
        price: '',
        taxable: true,
        people: []
      },
      item: {},
      orderForItem: 0
    }
  },
  methods: {
    openDialogAddingItem () {
      this.activeDialog = {type: 'addingItem', bool: true, autofocus: 'itemPriceFormForAdding'}
    },
    confirmToAddItem (commitFunc) {
      this.$store.commit(commitFunc, {item: this.__modifyItemData(this.tempItem)})

      this.__resetItemData()
      this.activeDialog = {type: 'addingItem', bool: false}
    },
    openDialogEditingItem (item) {
      this.item = item
      this.tempItem = clone(item)
      if (!this.tempItem.price) {
        this.tempItem.price = ''
      }
      this.activeDialog = {type: 'editingItem', bool: true, autofocus: 'itemPriceFormForEditing'}
    },
    confirmToEditItem () {
      Object.assign(this.item, this.__modifyItemData(this.tempItem))

      this.__resetItemData()
      this.activeDialog = {type: 'editingItem', bool: false}
    },
    openDialogDeletingItem (item) {
      this.item = item
      this.activeDialog = {type: 'deletingItem', bool: true}
    },
    confirmToDeleteItem (commitFunc) {
      this.$store.commit(commitFunc, {item: this.item})

      this.__resetItemData()
      this.activeDialog = {type: 'deletingItem', bool: false}
    },
    confirmToEditPeopleList () {
      this.__resetItemData()
      this.activeDialog = {type: 'editingPeopleList', bool: false}
    },
    openDialogEditingPeopleList (item) {
      this.tempItem = item
      this.activeDialog = {type: 'editingPeopleList', bool: true}
    },
    closeDialogAddingItem () {
      this.__resetItemData()
      this.activeDialog = {type: 'addingItem', bool: false}
    },
    closeDialogDeletingItem () {
      this.__resetItemData()
      this.activeDialog = {type: 'deletingItem', bool: false}
    },
    closeDialogEditingItem () {
      this.__resetItemData()
      this.activeDialog = {type: 'editingItem', bool: false}
    },
    __resetItemData () {
      this.item = {}
      this.tempItem = { name: '', price: '', taxable: true, people: [] }
    },
    dividedPrice (item) {
      return this.$format.precisionRound((item.price / (item.people.length || 1)), 2)
    },
    __modifyItemData (pureData) {
      let modifiedData = clone(pureData)

      modifiedData.name = modifiedData.name || 'Item ' + this.orderForItem++
      modifiedData.price = this.$format.precisionRound(modifiedData.price, 2) || 0.00
      modifiedData.taxable = modifiedData.taxable
      modifiedData.people = modifiedData.people || []

      return modifiedData
    }
  }
}
