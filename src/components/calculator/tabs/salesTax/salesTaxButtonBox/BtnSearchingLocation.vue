<template>
  <v-btn
    icon 
    color="green" 
    dark 
    small 
    fab 
    absolute 
    bottom 
    right 
    class="ma-0 mt-2 ics-button-nav" 
    @click="getSalesTax"
  >
    <v-icon>location_on</v-icon>
  </v-btn>
</template>
<script>
  import EventBus from '@/event-bus'

  export default {
    data () {
      return { }
    },
    methods: {
      getCurrentLocation () {
        if (!navigator.geolocation) {

        } else {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              })
            }, err => {
              // To components/calculator/tabs/salesTax/salesTaxToolsInfo/StatusBar.vue
              EventBus.$emit('ERROR_ON_SALESTAX', {
                message: this.convertErrorCodeToMsg(err.code),
                link: {
                  label: 'Learn more.',
                  router: {
                    name: 'faq.show',
                    params: {
                      slug: 'how_to_turn_a_location_service_on'
                    }
                  }
                }
              })
            })
          })
        }
      },
      getCurrentAddress (lat, lng) {
        const googleKey = 'AIzaSyCl7fbULQdlwssMehDR9G0hrmyu11fOdXo'
        const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleKey}&language=en`

        return new Promise((resolve, reject) => {
          this.$http.get(apiURL).then(res => {
            resolve({
              address: res.body.results[0].formatted_address,
              state: res.body.results[0].address_components[5].short_name,
              zipcode: res.body.results[0].address_components[7].short_name
            })
          }, () => {
            // To components/calculator/tabs/salesTax/salesTaxToolsInfo/StatusBar.vue
            EventBus.$emit('ERROR_ON_SALESTAX', {
              message: 'Can not get the location data from the map api.',
              link: {
                label: 'Learn more.',
                router: {
                  name: 'faq.show',
                  params: {
                    slug: 'how_to_turn_a_location_service_on'
                  }
                }
              }
            })
          })
        })
      },
      async getSalesTax () {
        EventBus.$emit('PROGRESS_ICON_FOR_SALESTAX', true)
        // const currentLocation = await this.getCurrentLocation()
        // const currentAddress = await this.getCurrentAddress(currentLocation.lat, currentLocation.lng)
        // const apiURL = `${this.$PATH_API}getSalesTax/${currentAddress.state}/${currentAddress.zipcode}`

        // TEMP
        const apiURL = `${this.$PATH_API}getSalesTax/CA/90028`
        // TEMP

        this.$http.get(apiURL).then(res => {
          EventBus.$emit('CURRENT_ADDRESS', 'Gyuju')
          EventBus.$emit('PROGRESS_ICON_FOR_SALESTAX', false)
          this.$store.commit(this.$route.name + '/' + 'setSalesTax', res.body.estimatedCombinedRate * 100)
        }, () => {
          // To components/calculator/tabs/salesTax/salesTaxToolsInfo/StatusBar.vue
          EventBus.$emit('ERROR_ON_SALESTAX', {
            message: 'Can not get the location data from the map api.',
            link: {
              label: 'Learn more.',
              router: {
                name: 'faq.show',
                params: {
                  slug: 'how_to_turn_a_location_service_on'
                }
              }
            }
          })
        })
      },
      convertErrorCodeToMsg (errCode) {
        switch (errCode) {
          case 1:
            return 'Permission accessing a location service is denied. Please allow a location service.'
          case 2:
            return 'The location where you are is unavailable. Please try it again.'
          case 3:
            return 'Can not get the location as an unknown reason. Please try it again.'
          default:
            return 'Unknown error'
        }
      }
    }
  }
</script>