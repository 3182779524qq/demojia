<template>
  <div class="ys-verification">
    <div class="input-wrapper" v-for="item in amount" :key="item">
      <input type="number"  @paste="handlePaste" title="code" v-focus="(item - 1) === currentIndex" maxlength="1" @input="handleInput($event,(item-1))" @keyup.delete="onDelete($event,(item-1))"  v-model="code[item-1]">
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationCodeInput',
  props: {
    amount: {
      type: Number,
      default: 4
    }
  },
  directives: {
    focus: {
      componentUpdated: function (el, obj) {
        obj.value && el.focus()
      }
    }
  },
  created () {
    this.code = new Array(this.amount).fill('')
  },
  methods: {
    handleInput (e, index) {
      this.currentIndex = index
      e.target.value = this.validateNumber(e.target.value)
      e.target.value !== '' && ++this.currentIndex
      !this.code.includes('') && this.$emit('onCompleted', this.code.join(''))
    },
    onDelete (e, index) {
      if (e.target.value === '') {
        this.currentIndex = index - 1
      }
    },
    validateNumber (val) {
      return val.replace(/\D/g, '')
    },
    handlePaste (e) {
      e.preventDefault()
    }
  },
  data () {
    return {
      code: [],
      currentIndex: 0
    }
  },
  watch: {
    code: {
      handler: function () {
        // console.log(this.code,'==================')
        for (let i = 0; i < this.code.length; i++) {
          if (this.code[i].length > 1) {
            this.code[i] = this.code[i].substring(0, 1)
          }
        }
      },
      deep: true //    深度监听
    }
  }
}

</script>

<style scoped>
  .ys-verification{
    width:370px;
    height: 70px;
    display: flex;
    justify-content: space-between;
  }
    /* .input-wrapper{
       border-bottom: 1px solid #D6D6D6;
       width: 70px;
       height: 0;
       padding-bottom:70px;
       position: relative;
    } */
  input{
    border: 0;
    width: 70px;
    height: 70px;
    text-align: center;
    transition: all 0.3s;
    font-size: 40px;
    color: #333333;
    outline: none;
  }
</style>
