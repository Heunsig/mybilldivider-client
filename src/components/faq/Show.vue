<template>
  <v-card flat>
    <v-card-title>
      <h2>{{ item.title }}</h2>
    </v-card-title>
    <v-card-text>
      <!-- <template v-if="item.content">
        <component :is="{
            template: item.content
          }"
        ></component>
      </template> -->
      <div>
        <div class="pb-3">
          <h3>Android (Chrome)</h3>
          <ol class="pl-4 pt-1 ics-ol">
            <li>Go to <strong>Settings > Location</strong>.</li>
            <li>Turn the location service on.</li>
            <li>Open up Chrome browser and go to <span class="green--text">My Bill Divider</span></li>
            <li>
              Push <v-btn icon fab small dark color="green" class="ics-button-in-content"><v-icon>location_on</v-icon></v-btn>
              on SETTING tab.
            </li>
            <li>
              Click the <strong>ALLOW</strong> button - The browser might pop up a new window like the below.
              <div class="ics-box-image">
                <img :src="$PATH_IMAGE + 'faq_allow_location_service_for_android.gif'" alt="a capture of allow dialog" style="max-width:300px; width:100%;"/>
              </div>
            </li>
          </ol>
          <v-alert color="orange" outline icon="priority_high" value="true">
            This manual may be vary by android phone models.
          </v-alert>
        </div>
        <div>
          <h3>iOS (Safari)</h3>
          <v-alert color="grey" outline icon="warning" value="true">
            Sorry, we are making a manual.
          </v-alert>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    created () {
      this.$http.get(this.$PATH_API + `faq/${this.$route.params.slug}`).then(res => {
        this.item = res.body
      }, err => {
        console.log(err)
      })
    },
    data () {
      return {
        item: {}
      }
    }
  }
</script>