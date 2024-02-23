<template>
  <view class="page">
    <view class="container">
      <camera class="camera" device-position="back" :flash="flash?'on':'off'" @error="onError">
        <cover-view class="cover-content">
          <cover-view class="horizontal-line"></cover-view>
          <cover-view class="vertical-line"></cover-view>
          <cover-view class="tip">请竖屏拍照，题目与参考线平行</cover-view>
        </cover-view>
      </camera>
    </view>
    <view class="tools">
      <view class="container">
        <view class="album-icon" @click="openAlbum">
          <view class="img">
            <image src="/static/img/icon_album.png" mode="heightFix" />
          </view>
          <view class="text font-size-30">相册导入</view>
        </view>
        <view class="camera-icon" @click="takePhoto">
          <view class="img-wrap">
            <image src="/static/img/icon_camera.png" mode="heightFix" />
          </view>
        </view>

        <view class="flashlight-icon" @click="flash=!flash">
          <view class="img">
            <image src="/static/img/icon_flashlight.png" mode="heightFix" />
          </view>
          <view class="text font-size-30">{{flash?'打开手电筒':'关闭手电筒'}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      flash: false, //on, off
    };
  },
  methods: {
    onError() {},
    openAlbum() {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempImagePath = res.tempFilePaths[0];
          console.log(tempImagePath);
          wx.navigateTo({
            url: "/photo-search/crop-picture/index?imgfile=" + tempImagePath,
          });
        },
      });
    },
    takePhoto() {
      const ctx = wx.createCameraContext();
      wx.redirectTo({
        url: "/photo-search/crop-picture/index?imgfile=",
      });
      ctx.takePhoto({
        quality: "high",
        success: (res) => {
          console.log(res.tempImagePath);
          wx.navigateTo({
            url:
              "/photo-search/crop-picture/index?imgfile=" + res.tempImagePath,
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  padding: 0;
  & > .container {
    flex: 1;
    background-color: #000;
    .camera {
      width: 100%;
      height: 100%;
      .cover-content {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 0;
        .horizontal-line {
          width: 200%;
          height: 33.33%;
          position: absolute;
          top: 33.33%;
          left: -100%;
          z-index: 9;
          border: 1px solid rgba(255, 255, 255, 0.5);
          // border-top: 1rpx solid rgba(255, 255, 255, 0.5);
          // border-bottom: 1rpx solid rgba(255, 255, 255, 0.5);
        }
        .vertical-line {
          width: 33.33%;
          height: 200%;
          position: absolute;
          top: -100%;
          left: 33.33%;
          z-index: 9;
          border: 1px solid rgba(255, 255, 255, 0.5);
          // background-color: red;
        }
        .tip {
          width: 100%;
          position: absolute;
          top: 50%;
          z-index: 9;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }
      }
    }
  }
  .tools {
    height: 270rpx;
    display: flex;
    align-items: center;
    .container {
      flex: 1;
      display: flex;
      align-items: baseline;
      justify-content: center;
    }
    .album-icon {
      .img {
        height: 70rpx;
        text-align: center;
        image {
          height: 100%;
          width: auto;
        }
      }
      .text {
        margin-top: 12rpx;
      }
    }
    .camera-icon {
      .img-wrap {
        height: 130.66rpx;
        width: 130.66rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 6rpx solid #fff;
        margin-left: 138rpx;
        margin-right: 138rpx;
        image {
          height: 77.33rpx;
          width: auto;
        }
      }
    }
    .flashlight-icon {
      .img {
        height: 70rpx;
        text-align: center;
        image {
          height: 100%;
          width: auto;
        }
      }
      .text {
        margin-top: 12rpx;
      }
    }
  }
}
</style>