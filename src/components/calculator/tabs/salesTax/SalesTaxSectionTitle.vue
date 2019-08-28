<template>
  <div class="green--text">
    Sales Tax(%) 
    <a
      @click="$router.push({
        name: 'faq.show', 
        params: {
          slug: 'how_to_know_the_sales_tax'
        }
      })"
    >
      Learn more
    </a>
  </div>
</template>