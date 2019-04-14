<template>
  <div class="full-page">
    <notifications></notifications>
    <div class="wrapper wrapper-full-page">
        <div class="container md-offset">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>
<style lang="scss" scoped>
  .full-page {
    background-image: url("../../assets/img/taxi.jpeg");
    position: relative;
  }
  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    margin: auto;
  }
</style>
