<template>
  <!-- <view class="page">
    <view class="container">
      <camera class="camera" device-position="back" :flash="flash?'on':'off'" @error="onError">
    </view>
    
  </view>-->
  <view class="page">
    <view class="container">
      <camera
        v-if="cameraVisible"
        :style="{height:cameraStyle.height,width: cameraStyle.width}"
        class="camera"
        device-position="back"
        :flash="flash?'on':'off'"
        @error="onError"
      >
        <cover-view class="cover-content">
          <cover-view class="horizontal-line"></cover-view>
          <cover-view class="vertical-line"></cover-view>
          <cover-view class="tip">公式、图片、表格等识别率较低，推荐多拍摄文本</cover-view>
        </cover-view>
      </camera>
    </view>
    <view class="tools">
      <view class="container">
        <view class="flashlight-icon" @click="flash=!flash">
          <view class="img">
            <image src="/static/img/icon_flashlight.png" mode="heightFix" />
          </view>
          <view class="text">{{flash?'打开手电筒':'关闭手电筒'}}</view>
        </view>

        <view class="camera-icon" @click="takePhoto">
          <view class="img-wrap">
            <image src="/static/img/icon_camera.png" mode="heightFix" />
          </view>
        </view>

        <view class="album-icon" @click="openAlbum">
          <view class="img">
            <image src="/static/img/icon_album.png" mode="heightFix" />
          </view>
          <view class="text">相册导入</view>
        </view>
      </view>
    </view>
    <van-dialog id="van-dialog" />
  </view>
</template>

<script>
// : "/wxcomponents/@vant/weapp/dist/popup/index"
import Dialog from "../../wxcomponents/@vant/weapp/dist/dialog/dialog";
export default {
  data() {
    return {
      cameraVisible: false,
      cameraStyle: {
        height: 0,
        width: 0,
      },
      flash: false, //on, off
      tipVisible: true,
    };
  },
  onLoad() {
    this.cameraStyle = {
      height: wx.getSystemInfoSync().windowHeight + "px",
      width: wx.getSystemInfoSync().windowWidth - 135 + "px",
    };
    console.log(wx.getSystemInfoSync());
    // this.cameraVisible = true;
    // wx.openSetting({
    //   success(res) {
    //     debugger
    //     console.log(res.authSetting);
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   },
    // });
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.camera"]) {
          this.tipVisible = true;
          Dialog.confirm({
            title: "小提示",
            message:
              "请注意一定要拍摄清晰喔，距离太远可能无法正确识别文字~\n\n如果图片无法正常拍摄和剪裁，请注意是否锁定了屏幕旋转，需要解锁后重试~",
          })
            .then(() => {
              // on close
              this.cameraVisible = true;
            })
            .catch(() => {
              // on cancel
              this.cameraVisible = true;
            });
        } else {
          this.tipVisible = false;
          this.cameraVisible = true;
        }
      },
    });
  },
  onShow() {
    if (this.tipVisible) return;
    debugger;
    this.cameraVisible = false;
    this.cameraStyle = {
      height: wx.getSystemInfoSync().windowHeight + "px",
      width: wx.getSystemInfoSync().windowWidth - 135 + "px",
    };
    console.log(wx.getSystemInfoSync());
    this.cameraVisible = true;
  },
  methods: {
    onError(e) {
      console.log(e);
    },
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
      // wx.redirectTo({
      //   url: "/photo-search/crop-picture/index?imgfile=",
      // });
      ctx.takePhoto({
        quality: "high",
        success: (res) => {
          console.log(res.tempImagePath);
          wx.redirectTo({
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
  padding: 0;
  & > .container {
    flex: 1;
    background-color: #000;
    .camera {
      // width: 100%;
      height: 750rpx;
      // height: 800rpx;
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
          bottom: 11px;
          left: 50%;
          z-index: 9;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.8);
          background-color: rgba(255, 255, 255, 0.3);
          text-align: center;
          width: 400px;
          border-radius: 11px;
          padding: 3px 0;
        }
      }
    }
  }
  .tools {
    width: 100px;
    // padding-right: 35px;
    // padding-left: 0;
    padding: 20px 35px 20px 0;
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    .container {
      // flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .album-icon {
      width: 60px;
      text-align: center;
      align-self: flex-end;
      .img {
        height: 35px;
        text-align: center;
        image {
          height: 100%;
          width: auto;
        }
      }
      .text {
        margin-top: 6px;
        font-size: 12px;
      }
    }
    .camera-icon {
      flex: 1;
      text-align: center;
      align-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: center;
      .img-wrap {
        height: 65px;
        width: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 3px solid #fff;
        // margin-top: 69px;
        // margin-bottom: 69px;
        image {
          height: 38px;
          width: auto;
        }
      }
    }
    .flashlight-icon {
      width: 60px;
      text-align: center;
      align-self: flex-end;
      .img {
        height: 35px;
        text-align: center;
        image {
          height: 100%;
          width: auto;
        }
      }
      .text {
        margin-top: 6px;
        font-size: 12px;
      }
    }
  }
}
</style>