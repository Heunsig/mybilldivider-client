import eventBus from '@/event-bus'

export default {
  data () {
    return {
      activeDialog: {
        type: '',
        bool: ''
      },
      windowPosition: ''
    }
  },
  watch: {
    activeDialog (payload) {
      if (payload.bool) {
        this.windowPosition = this.$getPosition.scrollTop()
        this.openDialogForIphone(this.windowPosition)

        // Execute autofocus if it is active
        if (payload.autofocus) {
          requestAnimationFrame(() => {
            this.$refs[payload.autofocus].focus()
          })
        }

        this.dialogs[payload.type] = payload.bool
      } else {
        this.closeDialogForIphone(this.windowPosition)
        this.dialogs[payload.type] = payload.bool
      }
    }
  },
  methods: {
    openDialogForIphone (scrolledPosition) {
      eventBus.bodyElement.className += 'modal-open'
      eventBus.bodyElement.style.marginTop = -(scrolledPosition) + 'px'
    },
    closeDialogForIphone (scrolledPosition) {
      var reg = new RegExp('(\\s|^)' + 'modal-open' + '(\\s|$)')
      eventBus.bodyElement.className = eventBus.bodyElement.className.replace(reg, ' ')
      eventBus.bodyElement.style.marginTop = '0px'
      this.$window.scrollTo(scrolledPosition, scrolledPosition)
    }
  }
}
