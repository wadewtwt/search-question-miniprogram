<template>
  <view class="page" :style="{ overflow: isLock ? 'hidden' : 'auto' }">
    <view class="welcome-modal" v-show="modal">
      <view class="welcome-modal-container">
        <view class="banner-3d">
          <view class="banner-1">
            <view class="banner-content">
              <view class="banner-item">
                <view class="banner-item-content">
                  <view>这道题怎么做？Mirror小程序里</view>
                  <view>搜一搜！</view>
                </view>
              </view>
              <view class="banner-item">
                <view class="banner-item-content">
                  <view>这道题的出处</view>
                  <view>是哪里？</view>
                </view>
              </view>
              <view class="banner-item">
                <view class="banner-item-content"
                  >我做的对吗？来对照一下正确答案吧！</view
                >
              </view>
            </view>
          </view>
          <view class="banner-2">
            <view class="banner-content">
              <view class="banner-item">
                <view class="banner-item-content">镜台教育</view>
              </view>
              <view class="banner-item">
                <view class="banner-item-content">
                  <image
                    src="/static/img/mirror_logo_home.png"
                    mode="heightFix"
                  />
                </view>
              </view>
            </view>
          </view>
          <view class="bg-img">
            <image src="/static/img/home_banner.png" mode="widthFix" />
          </view>
        </view>
        <view class="enter-btn" @click="modal = false"
          >点击进入Mirror（{{ seconds }}）</view
        >
      </view>
    </view>
    <view class="main-content" v-show="!modal">
      <view class="banner-swiper">
        <swiper :autoplay="true" @change="onSwiperChange" :circular="true">
          <block v-for="(item, index) in swiperImgs" :key="index">
            <swiper-item>
              <view class="swiper-item">
                <image
                  :src="item.img_url"
                  mode="heightFix"
                  @click="navigateTo('/web-view/index?url=' + item.url)"
                />
              </view>
            </swiper-item>
          </block>
        </swiper>
        <view class="indicator-dots">
          <view
            class="indicator-dots-item"
            :class="{ actived: swiperImgActived == index }"
            v-for="(item, index) in swiperImgs"
            :key="index"
          ></view>
        </view>
      </view>
      <view class="search-panel" @click="photograph">
        <view class="header-img">
          <image src="/static/img/mirror_logo_home.png" mode="heightFix" />
        </view>
        <view class="text">拍照搜题</view>
        <view class="footer-img">
          <image src="/static/img/icon_home_camera.png" mode="heightFix" />
        </view>
      </view>
      <view class="search-panel" @click="searchQuestionByText">
        <view class="header-img">
          <image src="/static/img/mirror_logo_home.png" mode="heightFix" />
        </view>
        <view class="text">文本搜题</view>
        <view class="footer-img">
          <image src="/static/img/icon_home_fdj.png" mode="heightFix" />
        </view>
      </view>
      <view class="bottom-panel">
        <view
          class="bottom-panel-item"
          @click="navigateTo('/web-view/guidance')"
        >
          <view class="icon">
            <image src="/static/img/icon_home_file.png" mode="heightFix" />
          </view>
          <view class="text">使用指南</view>
        </view>
        <view
          class="bottom-panel-item"
          @click="
            navigateTo('/web-view/index?url=https://www.xxx.net/mirror/')
          "
        >
          <view class="icon">
            <image src="/static/img/icon_home_star.png" mode="heightFix" />
          </view>
          <view class="text">了解镜台</view>
        </view>
      </view>

      <view class="modal" v-if="authenticationModalVisiable">
        <view class="mask" @click="authenticationModalVisiable = false"></view>
        <view class="modal-content">
          <view class="title">完善信息即可免费永久使用</view>
          <view class="form">
            <view class="form-item">
              <view class="label font-size-40 font-size-40">姓名</view>
              <view class="input-wrap font-size-40 font-size-40">
                <input
                  v-model="form.real_name"
                  placeholder="请输入姓名"
                  placeholder-class="input-placeholder"
                />
                <view class="icon-close" v-if="form.real_name">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.real_name = ''"
                  />
                </view>
                <!-- <view>{{userDetails.real_name}}</view> -->
              </view>
            </view>
            <view class="form-item">
              <view class="label font-size-40">手机号</view>
              <view class="input-wrap font-size-40">
                <input
                  v-model="form.phone"
                  type="number"
                  placeholder="请输入手机号"
                  placeholder-class="input-placeholder"
                />
                <view class="icon-close" v-if="form.phone">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.phone = ''"
                  />
                </view>
                <!-- <view>{{userDetails.phone}}</view> -->
              </view>
            </view>
            <view class="form-item">
              <view class="label font-size-40">微信号</view>
              <view class="input-wrap font-size-40">
                <input
                  v-model="form.wechat"
                  placeholder="请输入微信号"
                  placeholder-class="input-placeholder"
                />
                <!-- <view>{{userDetails.wechat}}</view> -->
                <view class="icon-close" v-if="form.wechat">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.wechat = ''"
                  />
                </view>
              </view>
            </view>
            <!-- <view class="form-item">
              <view class="label font-size-40">所在省份</view>
              <view class="input-wrap font-size-40" @click="provinceSelection = true">
                <view v-if="!form.province_ad_code" class="selection-placeholder">请选择</view>
                <view v-else class="input-text">{{provinceName}}</view>
                <view class="affixation">
                  <image src="/static/img/arrow_right.png" mode="heightFix" />
                </view>
              </view>
            </view>-->
            <view class="form-item">
              <view class="label font-size-40">所在学校</view>
              <view class="input-wrap font-size-40">
                <input
                  v-model="form.school"
                  placeholder="请输入就读学校"
                  placeholder-class="input-placeholder"
                />
                <!-- <view>{{userDetails.school}}</view> -->
                <view class="icon-close" v-if="form.school">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.school = ''"
                  />
                </view>
              </view>
            </view>
            <!-- <view class="form-item">
              <view class="label font-size-40">所在年级</view>
              <view class="input-wrap font-size-40" @click="gradeSelection = true">
                <view v-if="!form.grade" class="selection-placeholder">请选择</view>
                <view v-else class="input-text">{{gradeName}}</view>
                <view class="affixation">
                  <image src="/static/img/arrow_right.png" mode="heightFix" />
                </view>
              </view>
            </view>-->
            <!-- <view class="form-item">
              <view class="label font-size-40">目标院校</view>
              <view class="input-wrap font-size-40">
                <input
                  v-model="form.target_school"
                  placeholder="请输入目标院校"
                  placeholder-class="input-placeholder"
                />
                <view class="icon-close" v-if="form.target_school">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.target_school=''"
                  />
                </view>
              </view>
            </view>-->
            <!-- <view class="form-item">
              <view class="label font-size-40">目标专业</view>
              <view class="input-wrap font-size-40">
                <input
                  v-model="form.target_major"
                  placeholder="请输入目标专业"
                  placeholder-class="input-placeholder"
                />
                <view class="icon-close" v-if="form.target_major">
                  <image
                    src="/static/img/icon_close.png"
                    mode="heightFix"
                    @click="form.target_major=''"
                  />
                </view>
              </view>
            </view>-->
            <view class="submit-btn-wrap">
              <button class="button-middle" @click="submit">提交</button>
            </view>
          </view>
        </view>
        <!-- <van-popup
          :show="provinceSelection"
          position="bottom"
          custom-style="height: 40%;"
          @close="onPopupClose"
        >
          <view style="height:100%">
            <van-picker
              :columns="province.map(item=>item.name)"
              @confirm="onProvinceConfirm"
              show-toolbar
            />
          </view>
        </van-popup>-->
        <!-- <van-popup
          :show="gradeSelection"
          position="bottom"
          custom-style="height: 40%;"
          @close="onGradePopupClose"
        >
          <view style="height:100%">
            <van-picker
              :columns="grade.map(item=>item.title)"
              @confirm="onGradeConfirm"
              show-toolbar
            />
          </view>
        </van-popup>-->
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import WxValidate from "$utils/WxValidate";
export default {
  data() {
    return {
      seconds: 3,
      modal: true,
      swiperImgs: [],
      swiperImgActived: 0,
      authenticationModalVisiable: false,
      form: {
        real_name: "",
        phone: "",
        wechat: "",
        // province_ad_code: "",
        school: "",
        // grade: "",
        // target_school: "",
        // target_major: "",
      },
      // provinceSelection: false,
      // gradeSelection: false,
      // province: [],
      // grade: [],
      photoSearchTimes: 0,
      textSearchTimes: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    isCertified() {
      return this.$store.getters["user/isCertified"];
    },
    isLock() {
      return this.$store.getters["sys/isLock"];
    },
    baseInfo() {
      return this.$store.getters["user/baseInfo"];
    },
    userDetails() {
      return this.$store.getters["user/details"];
    },
    // provinceName() {
    //   let pro = this.province.find(
    //     (item) => item.ad_code == this.form.province_ad_code
    //   );
    //   return (pro && pro.name) || "";
    // },
    // gradeName() {
    //   let gra = this.grade.find((item) => item.val == this.form.grade);
    //   return (gra && gra.title) || "";
    // },
  },
  watch: {
    authenticationModalVisiable: function (val) {
      if (val) {
        this.initValidate();
        // this.getProvinceData();
        // this.getGradeData();
      }
    },
  },
  onLoad() {
    let timeoutId = setInterval(() => {
      if (this.seconds == 0) {
        if (this.modal) this.modal = false;
        clearTimeout(timeoutId);
      } else {
        this.seconds -= 1;
      }
    }, 1000);
    this.getBannerList();
  },
  onShow() {
    wx.setTabBarStyle({
      color: "#ffffff",
      backgroundColor: "#07072b",
      borderStyle: "black",
      selectedColor: "#ffffff",
      complete: () => {
        wx.setTabBarItem({
          index: 0,
          text: "首页",
          iconPath: "static/img/tabbar/home.png",
          selectedIconPath: "static/img/tabbar/home.png",
          complete: () => {
            wx.setTabBarItem({
              index: 1,
              text: "题库",
              iconPath: "static/img/tabbar/question_category.png",
              selectedIconPath: "static/img/tabbar/question_category.png",
              complete: () => {
                wx.setTabBarItem({
                  index: 2,
                  text: "个人中心",
                  iconPath: "static/img/tabbar/personal_center.png",
                  selectedIconPath: "static/img/tabbar/personal_center.png",
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
  methods: {
    checkLoginStatus(type) {
      return new Promise((resolve, reject) => {
        if (!this.isLogin) {
          wx.showModal({
            title: "提示",
            content: "您还未登录，登录并完善个人信息后解锁所有功能",
            success: (res) => {
              if (res.confirm) {
                this.$store.commit("user/token", "");

                this.$store.commit("user/baseInfo", {
                  avatar: "",
                });
                this.$store.commit("user/isLogin", false);
                wx.switchTab({
                  url: "/pages/personal-center/index",
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
              wx.clearStorageSync();
            },
          });
          return reject();
        } else if (!this.isCertified) {
          if (type == "photoSearchTimes" && this.photoSearchTimes > 4) {
            this.authenticationModalVisiable = true;
            return reject();
          } else if (type == "textSearchTimes" && this.textSearchTimes > 4) {
            this.authenticationModalVisiable = true;
            return reject();
          } else {
            return resolve();
          }
        }
        resolve();
      });
    },
    async photograph() {
      await this.checkLoginStatus("photoSearchTimes");
      this.navigateTo("/photo-search/photograph/index");
      this.photoSearchTimes++;
    },
    async searchQuestionByText() {
      await this.checkLoginStatus("textSearchTimes");
      this.navigateTo("/photo-search/search-question-by-text/index");
      this.textSearchTimes++;
    },

    navigateTo(url) {
      wx.navigateTo({
        url,
      });
    },
    async getBannerList() {
      let { data } = await apis.bannerList();
      this.swiperImgs = data;
    },
    onSwiperChange(e) {
      this.swiperImgActived = e.detail.current;
    },

    initValidate() {
      let rules = {
        real_name: {
          required: true,
          maxlength: 10,
        },
        phone: {
          required: true,
          tel: true,
        },
        wechat: {
          required: true,
        },
      };

      let message = {
        real_name: {
          required: "请输入姓名",
          maxlength: "名字不能超过10个字",
        },
        phone: {
          required: "请输入手机号",
          tel: "请输入正确格式的手机号",
        },
        wechat: {
          required: "请输入微信号",
        },
      };
      this.WxValidate = new WxValidate(rules, message);
    },
    // getProvinceData() {
    //   apis.dictionary("province").then((res) => {
    //     console.log(res);
    //     this.province = res.data;
    //   });
    // },
    // getGradeData() {
    //   apis.dictionary("grade").then((res) => {
    //     this.grade = res.data;
    //   });
    // },
    submit() {
      if (!this.WxValidate.checkForm(this.form)) {
        //表单元素验证不通过，此处给出相应提示
        let error = this.WxValidate.errorList[0];
        wx.showToast({
          title: error.msg,
          icon: "none",
        });
      } else {
        apis
          .updatePersonalInfo(this.form)
          .then((res) => {
            this.$store.dispatch("user/refreshPersonalCenter");
            this.authenticationModalVisiable = false;
          })
          .catch((err) => {
            console.log(err);
            wx.showToast({
              title: err.message,
              icon: "none",
            });
          });
      }
      return false;
    },
    // onPopupClose() {
    //   this.provinceSelection = false;
    // },
    // onGradePopupClose() {
    //   this.gradeSelection = false;
    // },
    // onProvinceConfirm(e) {
    //   this.form.province_ad_code = this.province[e.detail.index].ad_code;
    //   this.onPopupClose();
    // },
    // onGradeConfirm(e) {
    //   this.form.grade = this.grade[e.detail.index].val;
    //   this.onGradePopupClose();
    // },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.page {
  .welcome-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #07072b;
    .welcome-modal-container {
      // position: relative;
      height: 100%;
      .enter-btn {
        width: 544rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 6rpx;
        text-align: center;
        background-color: #fff;
        // margin: 120rpx auto;
        color: #07072b;
        font-size: 36rpx;
        position: absolute;
        bottom: 80rpx;
        left: 50%;
        z-index: 999;
        transform: translateX(-50%);
      }
    }
  }
  .main-content {
    .search-panel {
      background-color: #fff;
      border-radius: 7rpx;
      padding: 106rpx 0;
      text-align: center;
      margin: 10rpx 4rpx;
      .header-img {
        image {
          height: 67rpx;
          width: auto;
        }
      }
      .text {
        color: #07072b;
        font-size: 40rpx;
        margin-top: 6rpx;
      }
      .footer-img {
        margin-top: 22rpx;
        image {
          height: 104rpx;
          width: auto;
        }
      }
    }
    .bottom-panel {
      margin: 10rpx 4rpx;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom-panel-item {
        height: 98rpx;
        background-color: #fff;
        border-radius: 7rpx;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        & + .bottom-panel-item {
          margin-left: 10rpx;
        }
        .icon {
          image {
            height: 46rpx;
            width: auto;
          }
        }
        .text {
          margin-left: 8rpx;
          color: #07072b;
          font-size: 40rpx;
        }
      }
    }
  }
}
.banner-3d {
  position: relative;
  width: 654rpx;
  height: 936rpx;
  // margin: 40rpx auto 0 auto;
  padding-top: 80rpx;
  margin: 80rpx auto 0 auto;
  .banner-1 {
    width: 750rpx;
    height: 500rpx;
    // background-color: red;
    transform: skewY(-28deg) scaleX(0.6) translate(-260rpx, 30rpx);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    .banner-item-content {
      background-color: #dbdbff;
      color: #07072b;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      border-radius: 22rpx;
      position: relative;
      // width: 260rpx;
      // height: 135rpx;
      // text-align: center;
      &::after {
        content: "";
        position: absolute;
        bottom: -24rpx;
        right: 0;
        width: 0;
        height: 0;
        border-top: 42rpx solid #dbdbff;
        border-left: 44rpx solid transparent;
      }
    }
    .banner-item:nth-child(1) {
      position: absolute;
      top: -39px;
      left: 0px;
      .banner-item-content {
        font-size: 32rpx;
        width: 230rpx;
        padding: 30rpx;
      }
    }
    .banner-item:nth-child(2) {
      position: absolute;
      top: 92rpx;
      left: 315rpx;
      .banner-item-content {
        font-size: 32rpx;
        width: 225rpx;
        padding: 35rpx;
      }
    }
    .banner-item:nth-child(3) {
      position: absolute;
      top: 219rpx;
      left: 0px;
      .banner-item-content {
        font-size: 32rpx;
        width: 230rpx;
        padding: 30rpx;
      }
    }
  }
  .banner-2 {
    width: 375rpx;
    height: 500rpx;
    // background-color: blue;
    transform: skewY(28deg) scaleX(0.6) translate(150rpx, 5px);
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    .banner-item:nth-child(1) {
      position: absolute;
      top: -7px;
      left: 0px;
    }
    .banner-item:nth-child(2) {
      position: absolute;
      top: 240rpx;
      left: 0rpx;
      .banner-item-content {
        image {
          width: auto;
          height: 120rpx;
        }
      }
    }
    .banner-item-content {
      font-size: 66rpx;
      background-color: #dbdbff;
      color: #07072b;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 22rpx;
      position: relative;
      width: 372rpx;
      height: 175rpx;
      text-align: center;
      &::after {
        content: "";
        position: absolute;
        bottom: -47rpx;
        left: 0px;
        width: 0;
        height: 0;
        border-top: 80rpx solid #dbdbff;
        border-right: 80rpx solid transparent;
      }
    }
  }
  .bg-img {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    image {
      width: 100%;
      height: auto;
      // filter: hue-rotate(-2101deg) saturate(25%);
    }
  }
  .banner-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
.banner-swiper {
  position: relative;
  height: 224rpx;
  border-radius: 7rpx;
  overflow: hidden;

  swiper {
    height: 100%;
    border-radius: 7rpx;
    overflow: hidden;
  }
  swiper-item {
    border-radius: 7rpx;
    overflow: hidden;
  }
  .swiper-item {
    text-align: center;
    font-size: 0;
    height: 224rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 7rpx;
      overflow: hidden;
    }
  }
  .indicator-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .indicator-dots-item {
      width: 91rpx;
      height: 7rpx;
      border-radius: 3rpx;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.3);
      &.actived {
        background-color: #000000;
      }
      & + .indicator-dots-item {
        margin-left: 6rpx;
      }
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .modal-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 500rpx;
    z-index: 99;
    background-color: #07072b;
    padding: 0 56rpx;
    .title {
      color: #fff;
      text-align: center;
      font-size: 36rpx;
      margin-top: 20px;
      margin-bottom: 20rpx;
    }
    .form {
      .form-item {
        display: flex;
        align-items: center;
        & + .form-item {
          margin-top: 16rpx;
        }
        .label {
          width: 180rpx;
          line-height: 60rpx;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 6rpx;
          color: #fff;
          text-align: center;
        }
        .input-wrap {
          flex: 1;
          margin-left: 22rpx;
          background-color: rgba(255, 255, 255, 0.2);
          height: 60rpx;
          line-height: 60rpx;
          border-radius: 6rpx;
          color: #fff;
          display: flex;
          align-items: center;
          padding: 0 18rpx;
          box-sizing: border-box;
          position: relative;
          .selection-placeholder {
            flex: 1;
            color: rgba(255, 255, 255, 0.28);
          }
          .input-text {
            flex: 1;
          }
          input {
            height: 100%;
            flex: 1;
          }
          .affixation {
            height: 38rpx;
            image {
              height: 100%;
              width: auto;
            }
          }
          .icon-close {
            height: 38rpx;
            image {
              height: 100%;
              width: auto;
            }
          }
        }
      }
    }
    .submit-btn-wrap {
      margin-top: 44rpx;
      text-align: center;
      button {
        width: 394rpx;
      }
    }
  }
}
</style>