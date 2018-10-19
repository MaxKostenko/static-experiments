<template>
  <div id="app">
    <api-selector
      v-for="(url, index) in queue"
      :path="url"
      @nextStep="onNextStep($event, index)"
      @renderResults="onRenderResults($event, index)"
    >
    </api-selector>
    <div class="results" v-if="results.length">
      <strong>Results:</strong>
      <label v-for="result in results">
        <input type="radio" name="bundles" :value="result.data"/>
        {{result.data}}&nbsp;&nbsp;&nbsp;{{result.description}}&nbsp;&nbsp;&nbsp;{{result.price}}
      </label>
    </div>
  </div>
</template>

<script>


import ApiSelector from './Selector';
export default {
  name: 'app',
  data () {
    return {
      queue: [
        document.rootUrl
      ],
      results: []
    }
  },
  components: {
    ApiSelector
  },
  methods: {
    onNextStep(url, index) {
      this.results = [];
      this.queue.splice(index+1, this.queue.length, url);
    },
    onRenderResults(results, index) {
      this.queue.splice(index, this.queue.length);
      this.results = results;
    }
  }
}
</script>


<style>
  .results {
    display: inline-block;
    width: 400px;
  }
  .results label {
    display: block;
    margin: 2px;
    padding: 10px 5px;
    border: 1px solid #CCCCCC;
  }
</style>

