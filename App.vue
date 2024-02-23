<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
page {
  --popup-background-color: transparent;
}
@import "/wxcomponents/@vant/weapp/dist/common/index.wxss";

.van-dialog__header {
  color: #000;
}

page {
  height: 100%;
  background-color: #07072b;
  color: #fff;
  position: relative;
}
view {
  font-family: DFPYuanW5, Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.input-placeholder {
  color: rgba(255, 255, 255, 0.28);
}
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding-left: 38rpx;
  padding-right: 38rpx;
  color: #fff;
  background-color: #07072b;
}
.font-size-90 {
  font-size: 60rpx;
  line-height: 60rpx;
}
.font-size-80 {
  font-size: 53.33rpx;
  line-height: 53.33rpx;
}
.font-size-75 {
  font-size: 50rpx;
  line-height: 50rpx;
}
.font-size-60 {
  font-size: 40rpx;
  line-height: 40rpx;
}
.font-size-50 {
  font-size: 33.33rpx;
  line-height: 33.33rpx;
}
.font-size-40 {
  font-size: 28.57rpx;
  line-height: 28.57rpx;
}
.font-size-30 {
  font-size: 20rpx;
  line-height: 20rpx;
}
.button-large {
  display: inline-block;
  font-size: 40rpx;
  line-height: 40rpx;
  color: #07072b;
  padding: 21.33rpx 168rpx;
  &.long {
    display: block;
  }
}
.button-middle {
  display: inline-block;
  font-size: 33.33rpx;
  line-height: 33.33rpx;
  color: #07072b;
  padding: 14rpx 111rpx;
  &.long {
    display: block;
  }
}
</style>
