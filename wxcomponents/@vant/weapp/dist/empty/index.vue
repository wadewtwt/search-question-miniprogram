<template>
<uni-shadow-root class="@vant-weapp-dist-empty-index"><view class="custom-class van-empty">
  <view class="van-empty__image">
    <slot name="image"></slot>
  </view>
  <view class="van-empty__image">
    <image v-if="image" class="van-empty__image__img" :src="computed.imageUrl(image)"></image>
  </view>

  <view class="van-empty__description">
    <slot name="description"></slot>
  </view>
  <view class="van-empty__description">
    {{ description }}
  </view>

  <view class="van-empty__bottom">
    <slot></slot>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = '@vant/weapp/dist/empty/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    description: String,
    image: {
      type: String,
      value: 'default',
    },
  },
});
export default global['__wxComponents']['@vant/weapp/dist/empty/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-empty{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box;padding:32px 0}.van-empty__image{width:160px;height:160px}.van-empty__image:empty{display:none}.van-empty__image__img{width:100%;height:100%}.van-empty__image:not(:empty)+.van-empty__image{display:none}.van-empty__description{margin-top:16px;padding:0 60px;color:#969799;font-size:14px;line-height:20px}.van-empty__description:empty,.van-empty__description:not(:empty)+.van-empty__description{display:none}.van-empty__bottom{margin-top:24px}
</style>