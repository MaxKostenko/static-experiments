<template>
  <div>
    <label>
      I am counter: {{amount}}
    </label>
    <button @click="amount++">Plus</button>
  </div>
</template>

<script>
  export default {
    name: 'custom-counter',
    data () {
      return {
        amount: this.defaultAmount
      }
    },
    props: {
      defaultAmount: {
        type: Number,
        required: false,
        default: 0
      }
    }
  }
</script>