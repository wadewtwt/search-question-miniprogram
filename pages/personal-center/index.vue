<template>
  <view class="page">
    <view class="main-content">
      <view v-if="!isLogin" class="portrait font-size-60" @click="login">点我登录</view>
      <view v-else class="portrait">
        <image :src="baseInfo.avatar" mode="widthFix" />
      </view>
      <view class="info">
        <view class="user-info">
          <view v-if="!isLogin" class="name font-size-60">未登录</view>
          <view v-else class="name font-size-60">{{baseInfo.username||''}}</view>
          <view v-if="!isCertified" class="adress font-size-30">完善信息后解锁全部功能</view>
          <view
            v-else
            class="adress font-size-30"
          >{{userDetails.city?userDetails.city+' | ':''}}{{userDetails.school||''}}</view>
        </view>
        <view class="record">
          <view class="study-days">
            <view class="num">{{baseInfo.have_study_day||0}}</view>
            <view class="text">已学习天数</view>
          </view>
          <view class="rolls-brushed">
            <view class="num">{{baseInfo.have_document_num||0}}</view>
            <view class="text">已刷卷数</view>
          </view>
        </view>
      </view>
      <view class="plates-panel">
        <view class="plates">
          <view class="plate-item" @click="handlePortraitClick">
            <view class="icon">
              <image src="/static/img/pc_user.png" mode="heightFix" />
            </view>
            <view class="text">个人信息</view>
            <view class="right-icon">
              <image src="/static/img/arrow_right_dark.png" mode="heightFix" />
            </view>
          </view>
          <view class="plate-item" @click="navigateTo('/personal-center/my-collection/index')">
            <view class="icon">
              <image src="/static/img/pc_book.png" mode="heightFix" />
            </view>
            <view class="text">我的收藏</view>
            <view class="right-icon">
              <image src="/static/img/arrow_right_dark.png" mode="heightFix" />
            </view>
          </view>
          <view class="plate-item" @click="navigateTo('/personal-center/browsing-records/index')">
            <view class="icon">
              <image src="/static/img/pc_clock.png" mode="heightFix" />
            </view>
            <view class="text">历史记录</view>
            <view class="right-icon">
              <image src="/static/img/arrow_right_dark.png" mode="heightFix" />
            </view>
          </view>
          <view class="plate-item" @click="getShareRecordImage">
            <view class="icon">
              <image src="/static/img/pc_share.png" mode="heightFix" />
            </view>
            <view class="text">分享战绩</view>
            <view class="right-icon">
              <image src="/static/img/arrow_right_dark.png" mode="heightFix" />
            </view>
          </view>
        </view>
        <view class="logo">
          <image src="/static/img/mirror_logo_home.png" mode="widthFix" />
        </view>
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
  watch: {},
  onLoad() {
    console.log("onLoad");
  },
  onShow() {
    wx.setTabBarStyle({
      color: "#07072b",
      backgroundColor: "#ffffff",
      borderStyle: "white",
      selectedColor: "#07072b",
      complete: () => {
        wx.setTabBarItem({
          index: 0,
          text: "首页",
          iconPath: "static/img/tabbar/home_dark.png",
          selectedIconPath: "static/img/tabbar/home_dark.png",
          complete: () => {
            wx.setTabBarItem({
              index: 1,
              text: "题库",
              iconPath: "static/img/tabbar/question_category_dark.png",
              selectedIconPath: "static/img/tabbar/question_category_dark.png",
              complete: () => {
                wx.setTabBarItem({
                  index: 2,
                  text: "个人中心",
                  iconPath: "static/img/tabbar/personal_center_dark.png",
                  selectedIconPath:
                    "static/img/tabbar/personal_center_dark.png",
                });
              },
            });
          },
        });
      },
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
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
  padding-left: 0;
  padding-right: 0;
  .main-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .portrait {
      width: 180rpx;
      height: 180rpx;
      line-height: 180rpx;
      border-radius: 50%;
      margin: 75rpx auto 35rpx auto;
      background-color: #fff;
      color: #07072b;
      text-align: center;
      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .info {
      .user-info {
        text-align: center;
        .adress {
          margin-top: 16rpx;
        }
      }
      .record {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 52rpx;
        margin-bottom: 37rpx;
        .study-days,
        .rolls-brushed {
          text-align: center;
          .num {
            font-size: 46rpx;
          }
          .text {
            font-size: 24rpx;
          }
        }
        .rolls-brushed {
          margin-left: 170rpx;
        }
      }
    }
    .plates-panel {
      flex: 1;
      background-color: #fff;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      .plates {
        padding: 20rpx;
        .plate-item {
          display: flex;
          align-items: center;
          padding: 0 46rpx;
          height: 90rpx;
          .icon {
            width: 85rpx;
            image {
              height: 54rpx;
              width: auto;
            }
          }

          .text {
            flex: 1;
            color: #07072b;
          }
          .right-icon {
            width: 22rpx;
            image {
              height: 38rpx;
              width: auto;
            }
          }
          & + .plate-item {
            margin-top: 20rpx;
          }
        }
      }
    }
    .logo {
      text-align: center;
      padding: 88rpx 0;
      image {
        width: 546rpx;
        height: auto;
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