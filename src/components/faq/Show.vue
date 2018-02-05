<template>
  <v-card flat>
    <v-card-title>
      <h2>{{ item.title }}</h2>
    </v-card-title>
    <v-card-text>
      <div v-html="item.content"></div>
      <!-- <component :is="{template:item.content}"></component> -->
      <!-- <div :is="item.content"></div> -->
      <!-- <test></test> -->
    </v-card-text>
  </v-card>
</template>
<script>
  // import Vue from 'vue'
  // Vue.component('test', {
  //   template: '<div :is="item.content"></div>',
  //   created () {
  //     this.$http.get(this.$PATH_API + `faq/${this.$route.params.slug}`).then(res => {
  //       this.item = res.body
  //     }, err => {
  //       console.log(err)
  //     })
  //   },
  //   data () {
  //     return {
  //       item: {},
  //       hello: 'Hello world'
  //     }
  //   }
  // })
  export default {
    beforeCreate () {
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
    },
    render: {

    }
  }
</script>