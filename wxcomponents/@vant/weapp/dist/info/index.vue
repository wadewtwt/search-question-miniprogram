<template>
<uni-shadow-root class="@vant-weapp-dist-info-index"><view v-if="info !== null && info !== '' || dot" :class="'van-info '+(utils.bem('info', { dot }))+' custom-class'" :style="customStyle">{{ dot ? '' : info }}</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = '@vant/weapp/dist/info/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    dot: Boolean,
    info: null,
    customStyle: String,
  },
});
export default global['__wxComponents']['@vant/weapp/dist/info/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-info{position:absolute;top:0;right:0;display:-webkit-inline-flex;display:inline-flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;box-sizing:border-box;white-space:nowrap;-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%);-webkit-transform-origin:100%;transform-origin:100%;height:16px;height:var(--info-size,16px);min-width:16px;min-width:var(--info-size,16px);padding:0 3px;padding:var(--info-padding,0 3px);color:#fff;color:var(--info-color,#fff);font-weight:500;font-weight:var(--info-font-weight,500);font-size:12px;font-size:var(--info-font-size,12px);font-family:-apple-system-font,Helvetica Neue,Arial,sans-serif;font-family:var(--info-font-family,-apple-system-font,Helvetica Neue,Arial,sans-serif);background-color:#ee0a24;background-color:var(--info-background-color,#ee0a24);border:1px solid #fff;border:var(--info-border-width,1px) solid var(--white,#fff);border-radius:16px;border-radius:var(--info-size,16px)}.van-info--dot{min-width:0;border-radius:100%;width:8px;width:var(--info-dot-size,8px);height:8px;height:var(--info-dot-size,8px);background-color:#ee0a24;background-color:var(--info-dot-color,#ee0a24)}
</style>