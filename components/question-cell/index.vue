<template>
  <view class="cell">
    <view class="header">
      <view class="icon font-size-50">Q&A</view>
      <view class="title font-size-50">{{content.category}}</view>
      <view class="option-btns">
        <image
          v-if="content.is_collect==0"
          class="btn"
          src="/static/img/icon_star.png"
          mode="heightFix"
          @click="questionCollect"
        />
        <image v-else class="btn" src="/static/img/icon_star_full.png" mode="heightFix" />
        <button
          open-type="share"
          class="btn"
          data-type="question"
          :data-id="content.id"
          :data-question_txt="content.question_txt"
          :data-question_img="content.question_img"
          :data-category="content.category"
        >
          <image src="/static/img/icon_share.png" mode="heightFix" />
        </button>
      </view>
    </view>
    <view class="content" v-if="content.question_txt&&content.question_txt!=undefined" @click="toQuestionDetail">
      <view class="text font-size-40">{{content.question_txt}}</view>
    </view>
    <view
        class="img-content"
        v-if="content.question_img&&content.question_img!=undefined"
        @click="toQuestionDetail"
      >
        <view class="mask"></view>
        <image class="content-img" :src="content.question_img" mode="widthFix" />
      </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
export default {
  props: {
    content: {
      type: Object,
      default: function () {
        return {
          id: null,
          question_txt: "",
          category: "",
          is_collect: 0,
        };
      },
    },
  },
  
  methods: {
    toQuestionDetail() {
      wx.navigateTo({
        url: "/photo-search/question-detail/index?id=" + this.content.id,
      });
    },
    async questionCollect() {
      await apis.questionCollect(this.content.id);
      this.$emit("collected");
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {
  margin-bottom: 8rpx;
  .header {
    display: flex;
    align-items: center;
    .icon {
      border-radius: 10rpx;
      padding: 10rpx 12rpx;
      background-color: #fff;
      color: #07072b;
    }
    .title {
      margin-left: 16rpx;
      color: #ffffff;
      opacity: 0.69;
      flex: 1;
    }
    .option-btns {
      display: flex;
      align-items: center;
      margin-left: 16rpx;
      .btn {
        height: 52rpx;
        & + .btn {
          margin-left: 28rpx;
        }
        image {
        height: 100%;
        // height:52rpx;
        width: auto;
      }
      }
    }
  }
  .content {
    padding: 34rpx 8rpx;
    .text {
      line-height: 34rpx;
    }
  }
  .img-content {
    height: 206rpx;
    // background-image: linear-gradient(#fff 0, rgba(7, 7, 43, 0) 100%);
    // filter: alpha(opacity=100,finishopacity=0,style=2);
    position: relative;
    margin-top: 14rpx;
    overflow: hidden;
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      background-image: linear-gradient(
        rgba(7, 7, 43, 0) 0,
        rgba(7, 7, 43, 1) 100%
      );
    }
    .content-img {
      width: 100%;
    }
    .click-tip {
      position: absolute;
      bottom: 14rpx;
      left: 0;
      right: 0;
      z-index: 99;
      font-size: 22rpx;
      text-align: center;
      color: #cacacd;
    }
    &.answer-text {
      height: auto;
      word-wrap: break-word;
      min-height: 206rpx;
    }
  }
}
button {
  background: transparent;
  color: #fff;
  line-height: 1;
  margin: 0;
  padding: 0;
}
</style>