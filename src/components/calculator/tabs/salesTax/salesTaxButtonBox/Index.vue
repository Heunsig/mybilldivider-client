<template>
  <div>

    <!-- <BtnSearchingLocation /> -->

    <BtnZipcode />
    
    <BtnCalculator />
    
  </div>
</template>
<script>
  import BtnSearchingLocation from './BtnSearchingLocation'
  import BtnZipcode from './BtnZipcode'
  import BtnCalculator from './BtnCalculator'

  export default {
    components: {
      BtnSearchingLocation,
      BtnZipcode,
      BtnCalculator
    }
  }
</script>