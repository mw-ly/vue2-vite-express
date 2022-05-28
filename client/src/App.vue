<template>
  <div>
    <search-form
      initial-type="less"
      @submit:data="submitData"
    ></search-form>
    <search-list
      :list-data="studenData"
    >{{ errorMsg }}</search-list>
  </div>
</template>

<script>
import { getStudents } from './services'
import { tableMsg } from './config'
import SearchForm from './components/SearchForm.vue'
import SearchList from './components/SearchList.vue'

export default {
  name: 'App',
  components: {
    SearchForm,
    SearchList
  },
  data() {
    return {
      studenData: [],
      errorMsg: tableMsg.INITIAL
    }
  },
  methods: {
    async submitData(data) {
      const { type, score } = data
      this.showMsg('LOADING')

      try {
        const { errorNumber, data } = await getStudents(type, score)
        
        setTimeout(() => {
          if (errorNumber!== 200) {
            switch (errorNumber) {
              case 10001:
                this.showMsg('NODATA')
                break
              default:
                break
            }

            return
          }

          this.studenData = data
        }, 1000)
      } catch (err) {
        this.showMsg('ERROR')
      }
    },
    showMsg (type) {
      this.studenData = []

      switch (type) {
        case 'ERROR':
          this.errorMsg = tableMsg.ERROR
          break
        case 'NODATA':
          this.errorMsg = tableMsg.NODATA
          break
        case 'LOADING':
          this.errorMsg = tableMsg.LOADING
          break
        default:
          break
      }
    }
  }
}
</script>

<style>

</style>