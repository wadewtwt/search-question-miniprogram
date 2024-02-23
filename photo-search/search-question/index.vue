<template>
  <view class="page">
    <view class="question">
      <view class="title font-size-90">你搜索的题目是：</view>
      <view class="question-content">
        <textarea v-model="question" placeholder="请输入要搜索的题目"></textarea>
      </view>
      <view class="search-btn" @click="searchTxt">
        <view class="text font-size-50">搜索本题</view>
        <image class="icon" src="/static/img/icon_search.png" mode="heightFix" />
      </view>
    </view>
    <view class="answer">
      <view class="title">
        <text class="font-size-75">查询结果</text>
        <text class="total font-size-50">共{{answerList.length}}条</text>
      </view>
      <view class="answer-content">
        <view class="no-data" v-if="!answerList.length">
          <view class="text font-size-50">未查到该题，请确认是否输入正确题目</view>
          <view class="feedback-btn" @click="questionFeedback">反馈本题</view>
        </view>
        <view class="answer-list" v-else>
          <view
            class="answer-item"
            v-for="(item, index) in answerList"
            :key="index"
            @click="toQuestionDetail(item)"
          >
            <view class="answer-item-header">
              <!-- <text class="icon">Q＆A</text> -->
              <text class="text font-size-50">{{item.category}}</text>
            </view>
            <!-- <view class="answer-item-content font-size-40">{{item.question_txt}}</view> -->
            <view class="answer-item-content">
              <view class="icon">
                <image src="/static/img/icon_pdf.png" mode="heightFix" />
              </view>
              <view class="text font-size-50">{{item.document_name}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
export default {
  data() {
    return {
      imgfile: "",
      question: "",
      answerList: [],
    };
  },
  onLoad({ imgfile }) {
    this.imgfile = imgfile;
    this.search();
  },
  methods: {
    async search() {
      let res = await apis.searchQuestion(this.imgfile);
      this.question = res.data.main_question_txt;
      this.answerList = res.data.list;
    },
    searchTxt() {
      wx.navigateTo({
        url: "/photo-search/search-question-by-text/index?txt=" + this.question,
      });
    },
    toQuestionDetail({ id }) {
      wx.navigateTo({
        url: "/photo-search/question-detail/index?id=" + id,
      });
    },
    async questionFeedback() {
      await apis.questionFeedback(this.question);
      wx.showToast({
        title: "反馈成功",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .question {
    .title {
    }
    .question-content {
      margin-top: 16px;
      height: 313rpx;
      background-color: #393955;
      padding: 16rpx;
    }
    .search-btn {
      width: 394rpx;
      height: 60rpx;
      margin: 28rpx auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border-radius: 6rpx;
      color: #07072b;
      .icon {
        height: 40rpx;
        margin-left: 20rpx;
      }
    }
  }
  .answer {
    .title {
      .total {
        margin-left: 40rpx;
      }
    }
    .answer-content {
      .no-data {
        padding: 216rpx 0;
        text-align: center;
        .text {
          color: #777782;
        }
        .feedback-btn {
          margin-top: 20rpx;
          display: inline-block;
          border-radius: 6rpx;
          border: 1px solid #fff;
          padding: 8rpx 36rpx;
          font-size: 30rpx;
        }
      }
      .answer-list {
        padding: 14rpx 0;
        .answer-item {
          padding: 24rpx;
          background-color: #393955;
          border-radius: 14rpx;
          & + .answer-item {
            margin-top: 8rpx;
          }
          .answer-item-header {
            .icon {
              padding: 10rpx;
              border-radius: 10rpx;
              background-color: #fff;
              color: #07072b;
              margin-right: 20rpx;
            }
          }
          .answer-item-content {
            margin-top: 34rpx;
            margin-bottom: 14rpx;
            display: flex;
            align-items: center;
            .icon {
              height: 63rpx;
              image {
                height: 100%;
                // height:auto;
                width: auto;
              }
            }
            .text {
              width: 0;
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-left: 23rpx;
              margin-right: 23rpx;
            }
          }
        }
      }
    }
  }
}
</style>