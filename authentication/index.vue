<template>
  <view class="page">
    <view class="header">
      <view class="portrait">
        <image :src="baseInfo.avatar" mode="widthFix" />
      </view>
      <view class="info">
        <view class="name font-size-80">{{baseInfo.username}}</view>
        <view
          class="info-details font-size-30"
        >{{userDetails.city?userDetails.city+' | ':''}}{{userDetails.school}}</view>
      </view>
    </view>
    <view class="form">
      <view class="form-item">
        <view class="label font-size-40 font-size-40">姓名</view>
        <view class="input-wrap font-size-40 font-size-40" @click="toEditPage('real_name')">
          <view class="input-text">{{userDetails.real_name}}</view>
          <view class="affixation">
            <image src="/static/img/arrow_right.png" mode="heightFix" />
          </view>
        </view>
      </view>
      <view class="form-item">
        <view class="label font-size-40">手机号</view>
        <view class="input-wrap font-size-40">
          <view>{{userDetails.phone}}</view>
        </view>
      </view>
      <view class="form-item">
        <view class="label font-size-40">绑定微信号</view>
        <view class="input-wrap font-size-40">
          <view>{{userDetails.wechat}}</view>
        </view>
      </view>
      <!-- <view class="form-item">
        <view class="label font-size-40">所在省份</view>
        <view class="input-wrap font-size-40" @click="toEditPage('province_ad_code')">
          <view class="input-text">{{provinceName}}</view>
          <view class="affixation">
            <image src="/static/img/arrow_right.png" mode="heightFix" />
          </view>
        </view>
      </view> -->
      <view class="form-item">
        <view class="label font-size-40">所在学校</view>
        <view class="input-wrap font-size-40" @click="toEditPage('school')">
          <view>{{userDetails.school}}</view>
        </view>
      </view>
      <!-- <view class="form-item">
        <view class="label font-size-40">所在年级</view>
        <view class="input-wrap font-size-40" @click="toEditPage('grade')">
          <view class="input-text">{{gradeName}}</view>
          <view class="affixation">
            <image src="/static/img/arrow_right.png" mode="heightFix" />
          </view>
        </view>
      </view>
      <view class="form-item">
        <view class="label font-size-40">目标院校</view>
        <view class="input-wrap font-size-40" @click="toEditPage('target_school')">
          <view>{{userDetails.target_school}}</view>
        </view>
      </view>
      <view class="form-item">
        <view class="label font-size-40">目标专业</view>
        <view class="input-wrap font-size-40" @click="toEditPage('target_major')">
          <view>{{userDetails.target_major}}</view>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
export default {
  data() {
    return {
      // province: [],
      // grade: [],
    };
  },
  computed: {
    baseInfo() {
      return this.$store.getters["user/baseInfo"];
    },
    userDetails() {
      return this.$store.getters["user/details"];
    },
    // provinceName() {
    //   let pro = this.province.find(
    //     (item) => item.ad_code == this.userDetails.province_ad_code
    //   );
    //   return (pro && pro.name) || "";
    // },
    // gradeName() {
    //   let gra = this.grade.find((item) => item.val == this.userDetails.grade);
    //   return (gra && gra.title) || "";
    // },
  },
  onLoad() {
    // this.getProvinceData();
    // this.getGradeData();
  },
  methods: {
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
    toEditPage(property) {
      wx.navigateTo({
        url: "/authentication/edit?property=" + property,
      });
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
      }
    }
  }
  .submit-btn {
    width: 388rpx;
    height: 60rpx;
    line-height: 60rpx;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 3px;
    color: rgba(7, 7, 43, 1);
    margin-top: 144rpx;
  }
}
</style>