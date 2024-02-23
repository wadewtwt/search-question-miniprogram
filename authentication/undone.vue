<template>
  <view class="page">
    <view class="header">
      <view class="portrait" v-if="baseInfo.avatar">
        <image :src="baseInfo.avatar" mode="widthFix" />
      </view>
      <view class="info">
        <view class="name font-size-80">{{baseInfo.username}}</view>
        <view class="info-details font-size-30">完善信息后解锁全部功能</view>
      </view>
    </view>
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
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.real_name=''" />
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
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.phone=''" />
          </view>
          <!-- <view>{{userDetails.phone}}</view> -->
        </view>
      </view>
      <view class="form-item">
        <view class="label font-size-40">微信号</view>
        <view class="input-wrap font-size-40">
          <input v-model="form.wechat" placeholder="请输入微信号" placeholder-class="input-placeholder" />
          <!-- <view>{{userDetails.wechat}}</view> -->
          <view class="icon-close" v-if="form.wechat">
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.wechat=''" />
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
          <input v-model="form.school" placeholder="请输入就读学校" placeholder-class="input-placeholder" />
          <view class="icon-close" v-if="form.school">
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.school=''" />
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
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.target_school=''" />
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
            <image src="/static/img/icon_close.png" mode="heightFix" @click="form.target_major=''" />
          </view>
        </view>
      </view>-->
      <view class="submit-btn-wrap">
        <button class="button-middle" @click="submit">提交</button>
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
      </van-popup> -->
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import WxValidate from "../utils/WxValidate";
export default {
  data() {
    return {
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
    };
  },
  computed: {
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
  onLoad() {
    this.initValidate();
    // this.getProvinceData();
    // this.getGradeData();
  },
  methods: {
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
            wx.navigateBack({
              delta: 1,
            });
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
    getPhoneNumber(e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 86rpx 72rpx;
  .header {
    display: flex;
    align-items: center;
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
      margin-left: 36rpx;
      .name {
        line-height: 54rpx;
      }
      .info-details {
        line-height: 20rpx;
        margin-top: 94rpx - 54rpx - 20rpx;
      }
    }
  }
  .form {
    margin-top: 64rpx;
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
    margin-top: 144rpx;
    text-align: center;
    button {
      width: 394rpx;
    }
  }
}
</style>