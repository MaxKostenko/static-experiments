<template>
  <label>
    <input type="radio" name="product" :checked="isChecked" :value="productId"/>
    id:
    {{product.subscription}}.{{product.completeStatus}}.{{product.product}}
    <del>{{product.price.perMonth.old}}</del>
    {{product.price.perMonth.amount}}
  </label>
</template>

<script>
  export default {
    props: {
      product: {
        required: true,
        type: Object
      },
      productId: {
        required: true
      },
      value: {
        required: true
      }
    },
    computed: {
      isChecked () {
        return this.value === this.productId ? 'checked' : null;
      }
    }
  }
</script>