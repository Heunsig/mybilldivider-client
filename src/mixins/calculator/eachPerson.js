import clone from 'lodash.clone'

export default {
  data () {
    return {
      dialogs: {
        addingPerson: false,
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
  methods: {
    totalPriceWithoutSalesTax (person) {
      let total = 0

      person.menu.forEach(item => {
        total += item.price
      })

      return this.$format.precisionRound(total, 2)
    },
    openDialogAddingPerson () {
      this.activeDialog = {type: 'addingPerson', bool: true, autofocus: 'personNameFormForAdding'}
    },
    closeDialogAddingPerson () {
      this.person = {}
      this.tempPerson = { name: '', tip: '', menu: [] }
      this.activeDialog = {type: 'addingPerson', bool: false}
    },
    confirmToAddPerson (commitFunc) {
      this.$store.commit(commitFunc, {person: this.__modifyPersonData(this.tempPerson)})

      this.person = {}
      this.tempPerson = { name: '', tip: '', menu: [] }
      this.activeDialog = {type: 'addingPerson', bool: false}
    },
    openDialogEditingPerson (person) {
      this.person = person
      this.tempPerson = clone(person)
      this.activeDialog = {type: 'editingPerson', bool: true, autofocus: 'personNameFormForEditing'}
    },
    closeDialogEditingPerson () {
      this.person = {}
      this.tempPerson = {name: '', tip: '', menu: []}
      this.activeDialog = {type: 'editingPerson', bool: false}
    },
    confirmToEditPerson () {
      Object.assign(this.person, this.__modifyPersonData(this.tempPerson))

      this.person = {}
      this.tempPerson = {name: '', tip: '', menu: []}
      this.activeDialog = {type: 'editingPerson', bool: false}
    },
    openDialogDeletingPerson (person) {
      this.person = person
      this.activeDialog = {type: 'deletingPerson', bool: true}
    },
    confirmToDeletePerson (commitFunc) {
      this.$store.commit(commitFunc, {person: this.person})

      this.person = {}
      this.tempPerson = {name: '', tip: '', menu: []}
      this.activeDialog = {type: 'deletingPerson', bool: false}
    },
    closeDialogDeletingPerson () {
      this.person = {}
      this.tempPerson = {name: '', tip: '', menu: []}
      this.activeDialog = {type: 'deletingPerson', bool: false}
    },
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
    confirmToAddItem (commitFunc) {
      this.$store.commit(commitFunc, {person: this.person, item: this.__modifyItemData(this.tempItem)})

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
