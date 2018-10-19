<template>
  <div id="app">
    <custom-counter :default-amount="3"></custom-counter>
    <div></div>

    <h1>sim-only-page.title</h1>
    <h3>option.complete.title:</h3>
    <label>
      <input type="radio" name="completeStatus" value="not-complete" v-model="completeStatus"/>
      completeStatus.not-complete
    </label>
    <label>
      <input type="radio" name="completeStatus" value="mobile-complete" v-model="completeStatus"/>
      completeStatus.mobile-complete
    </label>
    <label>
      <input type="radio" name="completeStatus" value="full-complete" v-model="completeStatus"/>
      completeStatus.full-complete
    </label>
    <h3>option.subscription.title:</h3>
    <label>
      <input type="radio" name="subscription" value="one-year" v-model="subscription"/>
      subscription.one-year
    </label>
    <label>
      <input type="radio" name="subscription" value="two-year" v-model="subscription"/>
      subscription.two-year
    </label>
    <h3>option.packages.title:</h3>
<!--
    <product-bundle v-model="product" v-for="productId in productList" :productId="productId" :product="config.variants[productId]"></product-bundle>
-->

    <label v-for="productId in productList">
      <input type="radio" name="product" :value="productId" v-model="product"/>
      id:
      {{getProductById(productId).subscription}}.{{getProductById(productId).completeStatus}}.{{getProductById(productId).product}}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <del>€{{getProductById(productId).price.perMonth.old}}</del>
      €{{getProductById(productId).price.perMonth.amount}}
    </label>

    <h3>message.spotify.title</h3>
    <label>
      <input type="checkbox" :value="spotify.slug" v-model="options"/>
      message.spotify.label
    </label>
    <h1>sim-only-page.total</h1>
    <button @click="normalise">Norm</button>
  </div>
</template>

<script>
  import config from '../../offer';
  import ProductBundle from './ProductBundle';
  import iphone from '../iphone-offer';
  import { normalize, schema } from 'normalizr';
  import CustomCounter from './Counter';

  export default {
    name: 'app-cmp',
    data () {
      const defaultVariant = config.variants[config.defaults.variant];

      return {
        completeStatus: defaultVariant.completeStatus,
        subscription: defaultVariant.subscription,
        product: config.defaults.variant,
        options: []
      };
    },
    components: {
      CustomCounter,
      ProductBundle
    },
    computed: {
      productList () {
        return config.defaults.collections[this.completeStatus][this.subscription]['variants'];
      },
      spotify () {
        return config.products['product-spotify-premium'];
      },
      total () {

      }
    },
    watch: {
      productList () {
        this.product = config.defaults.collections[this.completeStatus][this.subscription].bestChoice;
      }
    },
    methods: {
      getProductById (id) {
        return config.variants[id];
      },
      normalise (){
        /*
        const optionSchema = new schema.Entity('options');
        const productSchema = new schema.Entity('products', {
          "options": [
            optionSchema
          ]
        });
        optionSchema.define({
          "products": [
            productSchema
          ]
        });
*/
        const productSchema = new schema.Entity('products');
        productSchema.define({
          "options": [
            {
              "products": [
                productSchema
              ]
            }
          ]
        });
        const mySchema = [ productSchema ];
        console.log(JSON.stringify(normalize(iphone, mySchema)));
      }
    }
  };
</script>

<style>
  label {
    display: block;
  }
</style>
