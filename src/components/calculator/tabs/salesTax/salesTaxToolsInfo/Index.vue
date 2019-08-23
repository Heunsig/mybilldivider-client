<template>
  <div>
    <div class="ics-box-address pa-2 text-xs-center">

      <StatusBar />

      <ToolsInfo />
      
    </div>
  </div>
</template>
<script>
  import StatusBar from './StatusBar'
  import ToolsInfo from './ToolsInfo'

  export default {
    components: {
      StatusBar,
      ToolsInfo
    },
    data () {
      return { }
    }
  }
</script>