<template>
  <view class="page">
    <view class="main-content">
      <!-- <button
        v-if="!isLogin"
        class="portrait"
        open-type="getUserInfo"
        @getuserinfo="getuserinfo"
      >未登录</button>-->
      <view v-if="!isLogin" class="portrait" @click="login">未登录</view>
      <view v-else class="portrait">
        <image :src="baseInfo.avatar" mode="widthFix" />
      </view>
      <view class="info">
        <view class="user-info">
          <view v-if="!isLogin" class="name">未登录</view>
          <view v-else class="name">{{baseInfo.username||''}}</view>
          <view v-if="!isCertified" class="adress">完善信息后解锁全部功能</view>
          <view
            v-else
            class="adress"
          >{{userDetails.city?userDetails.city+' | ':''}}{{userDetails.school||''}}</view>
        </view>
        <view class="info-logo">ID</view>
      </view>
      <view class="date">{{date}}</view>
      <view class="study-days">已学习天数 {{baseInfo.have_study_day||0}}</view>
      <view class="rolls-brushed">已刷卷数 {{baseInfo.have_document_num||0}}</view>
      <view class="line"></view>
      <br />
      <view class="plates-panel">
        <view class="plates">
          <view class="plate-item" @click="handlePortraitClick">
            <view class="icon">
              <image src="/static/img/pc_user.png" mode="heightFix" />
            </view>
            <view class="text">个人信息</view>
          </view>
          <view class="plate-item" @click="navigateTo('/personal-center/my-collection/index')">
            <view class="icon">
              <image src="/static/img/pc_book.png" mode="heightFix" />
            </view>
            <view class="text">我的收藏</view>
          </view>
          <view class="plate-item" @click="navigateTo('/personal-center/browsing-records/index')">
            <view class="icon">
              <image src="/static/img/pc_clock.png" mode="heightFix" />
            </view>
            <view class="text">历史记录</view>
          </view>
          <view class="plate-item" @click="getShareRecordImage">
            <view class="icon">
              <image src="/static/img/pc_share.png" mode="heightFix" />
            </view>
            <view class="text">分享战绩</view>
          </view>
        </view>
      </view>
      <view class="mi-logo">
        <image src="/static/img/mirror_logo.png" mode="heightFix" />
      </view>
    </view>
    <van-popup :show="shareRecordVisible" :closeable="true" @close="shareRecordVisible = false">
      <view class="poster-wrap">
        <view class="img">
          <image :src="shareRecordImage" mode="widthFix" />
        </view>
        <view
          v-if="shareRecordImage"
          class="button font-size-50"
          @click="saveImageToPhotosAlbum"
        >保存图片</view>
      </view>
    </van-popup>
  </view>
</template>

<script>
import apis from "$apis/index.js";
export default {
  data() {
    return {
      shareRecordVisible: false,
      shareRecordImage: "",
    };
  },
  computed: {
    date() {
      let now = new Date();
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "baiThursday",
        "Friday",
        "Saturday",
      ];
      return `${weeks[now.getDay()]}.${now.getDate()} ${
        now.toDateString().split(" ")[1]
      }. ${now.getFullYear()}`;
    },
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    isCertified() {
      return this.$store.getters["user/isCertified"];
    },
    baseInfo() {
      return this.$store.getters["user/baseInfo"];
    },
    userDetails() {
      return this.$store.getters["user/details"];
    },
  },
  watch: {
    // shareRecordVisible: function (val) {
    //   if (val) {
    //     this.getShareRecordImage();
    //   }
    // },
  },
  onLoad() {
    // this.getuserinfo()
    console.log("onLoad");
  },
  onReady() {
    console.log("onReady");
  },
  methods: {
    login() {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: ({ userInfo }) => {
          console.log(userInfo);
          wx.login({
            success: ({ code, errMsg }) => {
              if (code) {
                apis.checkIdentity({ ...userInfo, code }).then((rs) => {
                  this.$store.commit("user/token", rs.data.token);
                  this.$store.dispatch("user/personalCenter");
                });
              } else {
                console.log("登录失败！" + errMsg);
              }
            },
          });
        },
      });
    },
    getuserinfo(info) {
      if (info.detail.errMsg.indexOf("getUserInfo:fail") > -1) return;
      setTimeout(() => {
        wx.login({
          success: (res) => {
            if (res.code) {
              this.$store
                .dispatch("user/personalCenter", {
                  ...info.detail,
                  code: res.code,
                })
                .catch(() => {
                  wx.showModal({
                    title: "提示",
                    content: "好像出了一点点问题，请重新点击登录",
                  });
                });
            } else {
              console.log("登录失败！" + res.errMsg);
            }
          },
        });
      }, 500);
    },
    handlePortraitClick() {
      if (this.isCertified) {
        wx.navigateTo({
          url: "/authentication/index",
        });
      } else {
        wx.navigateTo({
          url: "/authentication/undone",
        });
      }
    },
    navigateTo(url) {
      wx.navigateTo({
        url,
      });
    },
    async getShareRecordImage() {
      let {
        data: { url: shareRecordImage },
      } = await apis.shareRecord();
      this.shareRecordImage = shareRecordImage;
      this.shareRecordVisible = true;
    },
    saveImageToPhotosAlbum() {
      var that = this;
      function opensit() {
        wx.showModal({
          content:
            "由于您还没有允许保存图片到您相册里,这无法进行分享操作点击确定去允许授权",
          success: function (res) {
            if (res.confirm) {
              /* 这个就是打开设置的API*/
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting);
                },
              });
            } else if (res.cancel) {
              wx.showModal({
                cancelText: "依然取消",
                confirmText: "重新授权",
                content: "很遗憾你点击了取消，这将无法进行分享操作，请慎重考虑",
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        console.log(res.authSetting);
                      },
                    });
                  } else if (res.cancel) {
                    console.log("用户不授权");
                  }
                },
              });
            }
          },
        });
      }
      function img() {
        /* 获取图片信息 */
        wx.getImageInfo({
          src: that.shareRecordImage,
          success: function (image) {
            console.log(image);
            /* 保存图片到相册 */
            wx.saveImageToPhotosAlbum({
              filePath: image.path,
              success: function () {
                console.log("save success");
                that.shareRecordVisible = false;
                wx.showModal({
                  title: "保存成功",
                  content: "图片已成功保存到相册，快去分享到您的圈子吧",
                  showCancel: false,
                });
              },
              complete(res) {
                console.log(res);
              },
            });
          },
        });
      }
      wx.authorize({
        /* 这个就是保存相册的 */
        scope: "scope.writePhotosAlbum",
        success() {
          /* 保存图片方法 */
          img();
        },
        complete(res) {
          console.log(res);
          /* 这里判断一下如果没有授权重新打开设置选项 */
          wx.getSetting({
            success(res) {
              if (!res.authSetting["scope.writePhotosAlbum"]) {
                /* 打开设置的方法 */
                opensit();
              }
            },
          });
        },
      });
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.page {
  .main-content {
    box-sizing: border-box;
    position: absolute;
    right: 38rpx;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    .portrait {
      display: inline-block;
      width: 130rpx;
      height: 130rpx;
      border-radius: 50%;
      overflow: hidden;
      background-color: #ffffff;
      color: #07072b;
      text-align: center;
      line-height: 130rpx;
      padding: 0;
      image {
        width: 100%;
        height: auto;
      }
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 32rpx;
      .user-info {
        .name {
          font-size: 40rpx;
          line-height: 40rpx;
        }
        .adress {
          margin-top: 14rpx;
          font-size: 16rpx;
          line-height: 16rpx;
        }
      }
      .info-logo {
        font-size: 100rpx;
        line-height: 100rpx;
      }
    }
    .date {
      display: inline-block;
      line-height: 40rpx;
    }
    .study-days,
    .rolls-brushed {
      font-size: 20rpx;
      line-height: 40rpx;
    }
    .line {
      display: inline-block;
      width: 418rpx;
      height: 2rpx;
      background-color: #fff;
    }
    .plates-panel {
      display: inline-block;
      margin-top: 16rpx;
    }
    .plates {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
      width: 280rpx;
      .plate-item {
        margin-left: 24rpx;
        margin-top: 14rpx;
        width: 116rpx;
        background-color: #fff;
        border-radius: 12rpx;
        .icon {
          height: 54rpx;
          text-align: center;
          padding: 8rpx 0;
          image {
            width: auto;
            height: 100%;
          }
        }
        .text {
          text-align: center;
          font-size: 16rpx;
          line-height: 28rpx;
          color: #07072b;
        }
      }
    }
    .mi-logo {
      height: 44rpx;
      margin-top: 44rpx;
      image {
        width: auto;
        height: 100%;
      }
    }
  }
}
.poster-wrap {
  width: 634rpx;
  height: 1080rpx;
  position: relative;
  image {
    height: auto;
    width: 100%;
  }
  .button {
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 45rpx;
    right: 45rpx;
    background-color: #fff;
    color: #390086;
    // font-size: 36rpx;
    border-radius: 8rpx;
  }
}
</style>