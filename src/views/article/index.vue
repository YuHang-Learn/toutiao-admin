<template>
  <div>
    <Form @formParams="formParams"></Form>
    <Table :formParams="form" :flag="flag"></Table>
  </div>
</template>

<script>
import Form from 'views/article/components/form'
import Table from 'views/article/components/table'
export default {
  name: 'Article',
  components: {
    Form,
    Table
  },
  data () {
    return {
      form: {
        date1: [],
        status: '',
        channel: null
      },
      flag: false
    }
  },
  methods: {
    formParams (params) {
      this.form = params
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>

</style>
