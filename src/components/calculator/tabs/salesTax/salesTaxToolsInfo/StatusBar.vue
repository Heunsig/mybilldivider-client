<template>
  <div v-if="error.message">
    <span class="red--text">Error: {{ error.message }}</span>
    <a 
      v-if="error.link.label" 
      @click="$router.push(error.link.router)"
    >
      {{ error.link.label }}
    </a>
  </div>
  <div v-else>
    <template v-if="progress">
      <v-progress-circular 
       indeterminate 
       color="green"
      />
    </template>
    <template v-else-if="currentAddress">
      {{ currentAddress }}
    </template>
    <template v-else>
      Set the sales tax with tools below. 
      <a @click="$router.push({name: 'faq.show', params: {slug: 'how_to_know_the_sales_tax'}})">
        Learn more.
      </a>
    </template>
  </div>
</template>
<script>
  import EventBus from '@/event-bus'

  export default {
    data () {
      return {
        error: {
          message: '',
          link: {
            label: '',
            router: {}
          }
        },
        currentAddress: '',
        progress: false
      }
    },
    mounted () {
      // From components/calculator/tabs/salesTax/salesTaxButtonBox/BtnSearchingLocation.vue
      EventBus.$on('ERROR_ON_SALESTAX', (payload) => {
        this.error = { ...this.error, ...payload }
      })

      // From components/calculator/tabs/salesTax/salesTaxButtonBox/BtnSearchingLocation.vue
      EventBus.$on('PROGRESS_ICON_FOR_SALESTAX', (payload) => {
        this.progress = payload
      })

      // From components/calculator/tabs/salesTax/salesTaxButtonBox/BtnSearchingLocation.vue
      EventBus.$on('CURRENT_ADDRESS', payload => {
        this.currentAddress = payload
      })
    }
  }
</script>