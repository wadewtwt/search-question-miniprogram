<template>
  <view class="page">
    <image :src="imgfile" mode="heightFix" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgfile: "",
    };
  },
  onLoad({ imgfile }) {
    this.imgfile = imgfile;
  },
};
</script>

<style>
</style>