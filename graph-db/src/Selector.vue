<template>
  <div v-if="loading">
    Loading ....
  </div>
  <div v-else>
    <label>
      <b>{{label}}:</b><br/>
      <select v-model="selectedValue" @change="onChange">
        <option :value="option.val" v-for="option in optionList">{{option.text}}</option>
      </select>
    </label>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'api-selector',
    data () {
      return {
        loading: true,
        list: [],
        label: '',
        selectedValue: '',
      };
    },
    props: {
      path: {
        required: false,
        default: '/brands'
      }
    },
    mounted () {
      axios.get(`${this.path}`)
        .then(response => response.data)
        .then((data) => {
          const key = Object.keys(data['_embedded'])[0];
          if(key === 'subscriptions') {
            this.$emit('renderResults', data['_embedded'][key]);
          } else {
            this.label = key;
            data['_embedded'][key].forEach((el) => {

              const elKeys = Object.keys(el["_links"]);
              const elKey = elKeys.find(elKey => elKey !== 'self');
              if(elKey !== 'undefined') {
                this.list.push({
                  val: el["_links"][elKey].href,
                  text: el[Object.keys(el)[0]]
                });
              }
            });
            this.loading = false;
          }
        });
    },
    computed: {
      optionList () {
        return [{val: '', text: 'Select Option'}, ...this.list];
      }
    },
    methods: {
      onChange () {
        this.$emit('nextStep', this.selectedValue);
      }
    }
  };
</script>