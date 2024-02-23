<template>
  <view class="modal" v-show="show">
    <view class="mask" @click="close"></view>
    <view class="modal-content">
      <view class="title">完善信息即可免费永久使用</view>
      <view class="form">
        <view class="form-item">
          <view class="label font-size-40 font-size-40">真实姓名</view>
          <view class="input-wrap font-size-40 font-size-40">
            <input
              v-model="form.real_name"
              placeholder="请输入真实姓名"
              placeholder-class="input-placeholder"
            />
            <view class="icon-close" v-if="form.real_name">
              <image src="/static/img/icon_close.png" mode="heightFix" @click="form.real_name=''" />
            </view>
            <!-- <view>{{userDetails.real_name}}</view> -->
          </view>
        </view>
        <view class="form-item">
          <view class="label font-size-40">绑定手机号</view>
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
          <view class="label font-size-40">绑定微信号</view>
          <view class="input-wrap font-size-40">
            <input v-model="form.wechat" placeholder="请输入微信号" placeholder-class="input-placeholder" />
            <!-- <view>{{userDetails.wechat}}</view> -->
            <view class="icon-close" v-if="form.wechat">
              <image src="/static/img/icon_close.png" mode="heightFix" @click="form.wechat=''" />
            </view>
          </view>
        </view>
        <view class="form-item">
          <view class="label font-size-40">所在省份</view>
          <view class="input-wrap font-size-40" @click="provinceSelection = true">
            <view v-if="!form.province_ad_code" class="selection-placeholder">请选择</view>
            <view v-else class="input-text">{{provinceName}}</view>
            <view class="affixation">
              <image src="/static/img/arrow_right.png" mode="heightFix" />
            </view>
          </view>
        </view>
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
              <image src="/static/img/icon_close.png" mode="heightFix" @click="form.school=''" />
            </view>
          </view>
        </view>
        <view class="form-item">
          <view class="label font-size-40">所在年级</view>
          <view class="input-wrap font-size-40" @click="gradeSelection = true">
            <view v-if="!form.grade" class="selection-placeholder">请选择</view>
            <view v-else class="input-text">{{gradeName}}</view>
            <view class="affixation">
              <image src="/static/img/arrow_right.png" mode="heightFix" />
            </view>
            <!-- <input v-model="form.name" placeholder="请选择" placeholder-class="input-placeholder" /> -->
          </view>
        </view>
        <view class="form-item">
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
            <!-- <view>{{userDetails.target_school}}</view> -->
          </view>
        </view>
        <view class="form-item">
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
            <!-- <view>{{userDetails.target_major}}</view> -->
          </view>
        </view>
        <view class="submit-btn-wrap">
          <button class="button-middle" @click="submit">提交</button>
        </view>
      </view>
    </view>
    <van-popup
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
    </van-popup>
    <van-popup
      :show="gradeSelection"
      position="bottom"
      custom-style="height: 40%;"
      @close="onGradePopupClose"
    >
      <view style="height:100%">
        <van-picker :columns="grade.map(item=>item.title)" @confirm="onGradeConfirm" show-toolbar />
      </view>
    </van-popup>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import WxValidate from "$utils/WxValidate";
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      form: {
        real_name: "",
        phone: "",
        wechat: "",
        province_ad_code: "",
        school: "",
        grade: "",
        target_school: "",
        target_major: "",
      },
      provinceSelection: false,
      gradeSelection: false,
      province: [],
      grade: [],
      columns: [
        { text: "杭州", disabled: true },
        { text: "宁波" },
        { text: "温州" },
      ],
    };
  },
  computed: {
    show: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit("update:value", val);
      },
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
    provinceName() {
      let pro = this.province.find(
        (item) => item.ad_code == this.form.province_ad_code
      );
      return (pro && pro.name) || "";
    },
    gradeName() {
      let gra = this.grade.find((item) => item.val == this.form.grade);
      return (gra && gra.title) || "";
    },
  },
  watch: {
    value(val) {
      this.$store.commit("sys/isLock", val);
    },
  },
  created() {
    this.initValidate();
    this.getProvinceData();
    this.getGradeData();
  },
  methods: {
    close() {
      this.show = false;
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
    getProvinceData() {
      apis.dictionary("province").then((res) => {
        console.log(res);
        this.province = res.data;
      });
    },
    getGradeData() {
      apis.dictionary("grade").then((res) => {
        this.grade = res.data;
      });
    },
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
    onPopupClose() {
      this.provinceSelection = false;
    },
    onGradePopupClose() {
      this.gradeSelection = false;
    },
    onProvinceConfirm(e) {
      this.form.province_ad_code = this.province[e.detail.index].ad_code;
      this.onPopupClose();
    },
    onGradeConfirm(e) {
      debugger;
      this.form.grade = this.grade[e.detail.index].val;
      this.onGradePopupClose();
    },
  },
};
</script>

<style lang="scss" scoped>
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
    height: 820rpx;
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
  }
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
</style>