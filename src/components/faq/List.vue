<template>
  <div>
    <v-list>
      <template v-for="(item, i) in list">
      <v-list-tile :key="item.slug" @click="$router.push({name: 'faq.show', params:{slug: item.slug}})">
        <v-list-tile-avatar>
          <v-icon>fa-question</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="list.length - 1 !== i"></v-divider>
      </template>
    </v-list>
  </div>
</template>
<script>
  export default {
    created () {
      this.$http.get(this.$PATH_API + 'faq').then(res => {
        this.list = res.body
      }, err => {
        console.log(err)
      })
    },
    data () {
      return {
        list: []
      }
    }
  }
</script>