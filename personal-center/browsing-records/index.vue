<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-90">历史记录</view>
      <view class="classification">
        <view class="classification-1">
          <view class="classification-1-item" :class="{'actived': type==1}" @click="type=1">
            <view class="font-size-50">Q&A</view>
          </view>
          <view
            class="classification-1-item font-size-50"
            :class="{'actived': type==2}"
            @click="type=2"
          >
            <view>
              <view class="font-size-50">Question</view>
              <view class="font-size-50">Papers</view>
            </view>
          </view>
          <view
            class="classification-1-item font-size-50"
            :class="{'actived': type==4}"
            @click="type=4"
          >
            <view>
              <view class="font-size-50">Mark</view>
              <view class="font-size-50">Scheme</view>
            </view>
          </view>
          <view class="classification-1-item" :class="{'actived': type==3}" @click="type=3">
            <text class="font-size-50">Others</text>
          </view>
        </view>
        <view class="classification-2">
          <view class="classification-2-item"></view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="paper-list">
        <view class="paper-list-item" v-for="(item,index) in list" :key="item.id">
          <question-cell
            v-if="item.question_txt||item.question_img"
            :key="index"
            :content="item"
            @collected="scanList"
          ></question-cell>
          <examination-cell v-if="item.name" :key="index" :content="item" @collected="scanList"></examination-cell>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import QuestionCell from "@/components/question-cell/index.vue";
import ExaminationCell from "@/components/examination-cell/index.vue";
import { share } from "$utils/index.js";
export default {
  data() {
    return {
      type: 1,
      list: [],
    };
  },
  watch: {
    type: function () {
      this.scanList();
    },
  },
  onLoad() {
    this.scanList();
  },
  methods: {
    async scanList() {
      let res = await apis.scanList({
        type: this.type,
      });
      this.list = res.data.list;
    },
  },
  components: {
    QuestionCell,
    ExaminationCell,
  },
  onShareAppMessage: function (res) {
    return share(res);
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  .header {
    padding: 26rpx 0;
  }
  .content {
    flex: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .paper-list{
      .paper-list-item{
        &+.paper-list-item{
          margin-top: 20rpx;
        }
      }
    }
  }
}
.classification {
  margin-top: 26rpx;
  .classification-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .classification-1-item {
      // background-color: #393955;
      color: #afafb7;
      border-radius: 14rpx 14rpx 0 0;
      padding: 0 28rpx;
      word-break: break-all;
      height: 114rpx;
      text-align: center;
      display: flex;
      align-items: center;
      & > view {
        display: inline-block;
        vertical-align: middle;
        line-height: 114rpx;
      }
      &.actived {
        background-color: #ffffff;
        color: #07072b;
      }
    }
  }
  .classification-2 {
    display: flex;
    align-items: center;
    border-radius: 0 0 14rpx 14rpx;
    overflow: hidden;
    .classification-2-item {
      flex: 1;
      min-height: 4rpx;
      line-height: 79rpx;
      background-color: #ffffff;
      color: #afafb7;
      text-align: center;
      &.actived {
        color: #07072b;
      }
    }
  }
}
</style>