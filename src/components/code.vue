<template>
  <div class="ys-verification">
    <div class="input-wrapper" v-for="item in amount" :key="item">
      <el-input type="number"  @paste="handlePaste" title="code" v-focus="(item - 1) === currentIndex" max="9" maxlength="1" @input="handleInput($event,(item-1))" @keyup.delete="onDelete($event,(item-1))"  v-model="code[item-1]"></el-input>
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
  }
}
</script>
