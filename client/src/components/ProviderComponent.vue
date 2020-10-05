<template>
  <div class="container">
    <h1>Latest Providers</h1>
    <!--CREATE PROVIDER -->
    <hr>
    <p class="error" v-if="error">{{error}}</p>
  <div class="providers-container">
      <div class="provider"
      v-for="(provider,index) in providers"
      v-bind:item="provider"
      v-bind:index="index"
      v-bind:key="provider._id">
      {{`${provider.createdAt.getDate()}/${provider.createdAt.getMonth()}/
      ${provider.createdAt.getFullYear()}`}}
      <p class="text">{{provider.text}} </p>
      </div>

  </div>
  </div>
</template>

<script>
import ProviderService from '../ProviderService';
export default {
  name: 'ProviderComponent',
  data(){
    return {
      providers: [],
      error: '',
      text: ''
    }
  },
  async created(){
    try{
      this.providers = await ProviderService.getProviders();

    } catch(err){
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.provider{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at{
  position:absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0; 
}
</style>
