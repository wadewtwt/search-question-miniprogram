<template>
  <view class="page">
    <view class="content">
      <l-clipper
        v-if="show"
        class="clipper-component"
        ref="clipper"
        :image-url="imageUrl"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :isLockWidth="isLockWidth"
        :isLockHeight="isLockHeight"
        :isLockRatio="isLockRatio"
        :isLimitMove="isLimitMove"
        :isDisableScale="isDisableScale"
        :isDisableRotate="isDisableRotate"
        :isShowCancelBtn="isShowCancelBtn"
        :isShowPhotoBtn="isShowPhotoBtn"
        :isShowRotateBtn="isShowRotateBtn"
        :isShowConfirmBtn="isShowConfirmBtn"
        @success="onSuccess"
        @cancel="show = false"
      ></l-clipper>
      <view class="tip">一次只能提交一道题</view>
    </view>
    <view class="tools">
      <view class="tool-btn" @click="clipAll">
        <view class="image">
          <image src="/static/img/icon_clipall.png" mode="heightFix" />
        </view>
        <view class="text">全部</view>
      </view>
      <view class="tool-btn" @click="rotate">
        <view class="image">
          <image src="/static/img/icon_rorate_left.png" mode="heightFix" />
        </view>
        <view class="text">逆时针旋转</view>
      </view>
      <view class="tool-btn" @click="rerotate">
        <view class="image">
          <image src="/static/img/icon_rorate_right.png" mode="heightFix" />
        </view>
        <view class="text">顺时针旋转</view>
      </view>
      <view class="tool-btn" @click="nextStep">
        <view class="image">
          <image src="/static/img/icon_arrow_right.png" mode="heightFix" />
        </view>
        <view class="text">下一步</view>
      </view>
    </view>
  </view>
</template>

<script>
import lClipper from "@/components/lime-clipper/index.vue";
export default {
  components: { lClipper },
  data() {
    return {
      show: false,
      url: "",
      imageUrl: "",
      maxWidth: 600,
      maxHeight: 600,
      isLockWidth: false,
      isLockHeight: false,
      isLockRatio: false,
      isLimitMove: true,
      isDisableScale: false,
      isDisableRotate: false,
      isShowCancelBtn: false,
      isShowPhotoBtn: false,
      isShowRotateBtn: false,
      isShowConfirmBtn: false,
    };
  },
  onLoad({ imgfile }) {
    // imgfile = "http://tmp/ZYyHZZXD0GDr29489dd1e2160724b0aabe15130d41e6.png"; //TODO
    this.imageUrl = imgfile;
    wx.getImageInfo({
      src: imgfile,
      success: (res) => {
        console.log(res.width);
        console.log(res.height);
        // this.maxWidth = res.width;
        // this.maxHeight = res.height;
        this.maxWidth = 9999;
        this.maxHeight = 9999;
        return { width: res.width, height: res.height };
      },
    });
    this.show = true;
  },
  methods: {
    clipAll() {
      this.$refs["clipper"].clipAll();
    },
    rotate() {
      this.$refs["clipper"].rotate();
    },
    rerotate() {
      this.$refs["clipper"].rerotate();
    },
    nextStep() {
      this.$refs["clipper"].confirm();
    },
    onSuccess($event) {
      wx.redirectTo({
        url: "/photo-search/search-question/index?imgfile=" + $event.url,
      });
      // url = $event.url; show = false
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  // flex-direction: column;
  padding-left: 0;
  padding-right: 0;
  .content {
    flex: 1;
    position: relative;
    overflow: hidden;
    .clipper-component {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .tip {
      position: absolute;
      z-index: 999;
      bottom: 11px;
      left: 50%;
      transform: translateX(-50%);
      color: #ffffff;
      opacity: 0.8;
      width: 200px;
      background-color: rgba(255, 255, 255, 0.3);
      text-align: center;
      border-radius: 11px;
      padding: 3px 0;
      margin-left: 40px;
    }
  }
  .tools {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    z-index: 999;
    background-color: #07072b;
    .tool-btn {
      text-align: center;
      .image {
        height: 27px;
        image {
          height: 100%;
          width: auto;
        }
      }
      .text {
        color: #fff;
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>