<template>
  <v-card flat>
    <v-card-title>
      <h2>{{ item.title }}</h2>
    </v-card-title>
    <v-card-text>
      <template v-if="item.content">
           <component :is="{
              template: item.content
            }"
          > </component>
      </template>
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