<template>
  <div>
    <template v-if="list.length">
      <v-list>
        <template v-for="(item, i) in list">
        <v-list-tile :key="item.slug" @click="$router.push({name: 'faq.show', params:{slug: item.slug}})">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="list.length - 1 !== i"></v-divider>
        </template>
      </v-list>
    </template>
    <template v-else>
      <div class="text-xs-center pt-2 pb-2">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </div>
    </template>
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