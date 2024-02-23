<template>
  <view class="page">
    <view class="content">
      <image-cropper
        ref="clipper"
        :angle="angle"
        :cutWidth="cutWidth"
        :cutHeight="cutHeight"
        :src="imgfile"
        minZoom="0.1"
        background="#07072b"
        canvasBackground="transparent"
        @cropped="cropped"
      ></image-cropper>
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
import ImageCropper from "@/components/uniapp-nice-cropper/cropper.vue";
export default {
  data() {
    return {
      imgInfo: {
        width: 0,
        height: 0,
      },
      imgfile: "",
      angle: 0,
      cutWidth: "50%",
      cutHeight: 0,
      croppedImg: "",
    };
  },
  onLoad({ imgfile }) {
    this.imgfile = imgfile;
    wx.getImageInfo({
      src: this.imgfile,
      success: (res) => {
        console.log(res);
        this.imgInfo = res;
        this.cutHeight = 293*res.height/res.width;
        this.clipAll()
      },
    });
  },
  methods: {
    cropped(imagePath, imageInfo) {
      this.croppedImg = imagePath;
    },
    clipAll() {
      this.angle = 0
      let height = 293*this.imgInfo.height/this.imgInfo.width
      this.$refs["clipper"].clipAll(height);
    },
    rotate() {
      this.angle = this.angle - 90;
      this.$refs["clipper"].setRotate(this.angle);
    },
    rerotate() {
      this.angle = this.angle + 90;
      this.$refs["clipper"].setRotate(this.angle);
    },
    nextStep() {
      wx.redirectTo({
        url: "/photo-search/search-question/index?imgfile=" + this.croppedImg,
      });
    },
  },
  components: {
    ImageCropper,
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
    }
  }
  .tools {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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