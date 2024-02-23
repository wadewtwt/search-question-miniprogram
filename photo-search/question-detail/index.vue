<template>
  <view class="page">
    <view class="question">
      <view class="title font-size-90">题目</view>
      <view class="content" @click="previewImage(detailData.question_url)">
        <view class="mask"></view>
        <image class="content-img" :src="detailData.question_url" mode="widthFix" />
        <view class="click-tip">点击查看完整图片</view>
      </view>
    </view>
    <view class="answer">
      <view class="title font-size-90">答案</view>
      <view
        class="content"
        v-if="detailData.answer_url"
        @click="previewImage(detailData.answer_url)"
      >
        <view class="mask"></view>
        <image class="content-img" :src="detailData.answer_url" mode="widthFix" />
        <view class="click-tip">点击查看完整图片</view>
      </view>
      <view class="content answer-text" v-else v-html="detailData.answer_txt"></view>
    </view>
    <view class="operation-btns">
      <view class="btn" @click="questionCollect">
        <view class="icon">
          <image v-if="detailData.is_collect==0" src="/static/img/icon_star.png" mode="heightFix" />
          <image v-else src="/static/img/icon_star_full.png" mode="heightFix" />
        </view>
        <view class="text font-size-30">收藏</view>
      </view>
      <view class="btn">
        <button
          open-type="share"
          data-type="question"
          :data-id="detailData.id"
          :data-question_txt="detailData.question_txt"
          :data-category="detailData.category"
        >
          <view class="icon">
            <image src="/static/img/icon_share.png" mode="heightFix" />
          </view>
          <view class="text font-size-30">分享本题</view>
        </button>
      </view>
    </view>
    <view class="source">
      <view class="title font-size-50">题目来源：</view>
      <view class="source-content">
        <view class="category font-size-50">{{detailData.category}}</view>
        <view class="paper-list">
          <examination-cell :content="documentDetails" @collected="questionDetail(detailData.id)"></examination-cell>
        </view>
      </view>
    </view>
    <view class="source">
      <view class="title font-size-50">答案来源：</view>
      <view class="source-content">
        <view class="paper-list">
          <examination-cell
            :content="answerDocumentDetails"
            @collected="questionDetail(detailData.id)"
          ></examination-cell>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import ExaminationCell from "@/components/examination-cell/index.vue";
import { share } from "$utils/index.js";
export default {
  data() {
    return {
      detailData: {
        id: null,
        question_url: "",
        answer_url: "",
        is_collect: 1,
        document_name: "",
        document_is_collect: 0,
        category: "",
      },
    };
  },
  computed: {
    documentDetails() {
      return {
        id: this.detailData.document_id,
        name: this.detailData.document_name,
        is_collect: this.detailData.document_is_collect,
        // answer_document_id: this.detailData.answer_document_id,
        document_url: this.detailData.document_url,
      };
    },
    answerDocumentDetails() {
      return {
        id: this.detailData.answer_document_id,
        name: this.detailData.answer_document_name,
        is_collect: this.detailData.answer_document_is_collect || 0, // TODO: 接口未返回
        // answer_document_id: this.detailData.answer_document_id,
        // document_url: this.detailData.document_url,
      };
    },
  },
  onLoad({ id }) {
    // id = "3";
    if (id) this.questionDetail(id);
  },
  methods: {
    async questionDetail(id) {
      if (!id) return;
      let res = await apis.questionDetail({
        id,
      });
      this.detailData = res.data;
    },
    previewImage(url) {
      wx.previewImage({
        current: url,
        urls: [url],
      });
    },
    // openDocument() {
    //   wx.downloadFile({
    //     url: "https://" + this.detailData.document_url,
    //     success: function (res) {
    //       const filePath = res.tempFilePath;
    //       wx.openDocument({
    //         filePath: filePath,
    //         success: function (res) {
    //           console.log("打开文档成功");
    //         },
    //       });
    //     },
    //   });
    // },
    async questionCollect() {
      await apis.questionCollect(this.detailData.id);
      // wx.showToast({
      //   title: "收藏成功"
      // });
      await this.questionDetail(this.detailData.id);
    },
    // async documentCollect() {
    //   await apis.documentCollect(this.content.id);
    //   await this.questionDetail(this.detailData.id);
    // },
  },
  components: {
    ExaminationCell,
  },
  onShareAppMessage: function (res) {
    return share(res);
  },
};
</script>

<style lang="scss" scoped>
.question,
.answer {
  .title {
  }
  .content {
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
.operation-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 66rpx 0 60rpx 0;
  text-align: center;
  .btn {
    button {
      background: transparent;
      color: #fff;
    }
    .icon {
      height: 66rpx;

      image {
        height: 100%;
        width: auto;
      }
    }
    .text {
      margin-top: 14rpx;
    }
    + .btn {
      margin-left: 84rpx;
    }
  }
}
.source {
  .source-content {
    padding: 20rpx 38rpx;
    .category {
      color: #cacacd;
    }
  }
}
.paper-list {
  margin-top: 14rpx;
  .paper-list-item {
    display: flex;
    align-items: center;
    .front-icon {
      height: 63rpx;
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
    .option-btn {
      height: 52rpx;
      & + .option-btn {
        margin-left: 32rpx;
      }
    }
    & + .paper-list-item {
      margin-top: 27rpx;
    }
  }
}
</style>