<template>
  <v-alert color="orange" icon="priority_high" dismissible v-model="alert">
    These prices has been rounded, so It could be a little different.
    <a @click.stop="$router.push({name: 'faq.show', params: {slug: 'why_is_a_total_of_payment_different'}})">
      Learn more.
    </a>
  </v-alert>
</template>
<script>
  export default {
    data () {
      return {
        alert: true
      }
    }
  }
</script>