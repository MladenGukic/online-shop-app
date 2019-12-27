<template>
  <input type="text" class="form-control" placeholder="Search" v-model="search" @input="searchTermUpdated($event.target.value)"/>
</template>

<script>
export default {    
    name: 'AppSearch',
    data() {
      return {
        search: ''
      }
    },
    methods: {
        searchTermUpdated(search) {
        this.$emit('search-term-updated', search)
        }
    }
}
</script>