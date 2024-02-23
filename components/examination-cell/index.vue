<template>
  <view class="cell" v-if="!loading">
    <view class="icon" @click="geDocumentUrl(content.id)">
      <image src="/static/img/icon_pdf.png" mode="heightFix" />
    </view>
    <view class="text font-size-50" @click="geDocumentUrl(content.id)">{{content.name}}</view>
    <!-- <view class="answer-btn font-size-50" @click="geDocumentUrl(content.answer_document_id)">答案</view> -->
    <view class="option-btns">
      <image
        v-if="content.is_collect==0"
        class="btn"
        src="/static/img/icon_star.png"
        mode="heightFix"
        @click="documentCollect"
      />
      <image v-else class="btn" src="/static/img/icon_star_full.png" mode="heightFix" />
      <button
        open-type="share"
        class="btn"
        data-type="document"
        :data-id="content.id"
        :data-name="content.name"
        :data-answer_document_id="content.answer_document_id"
      >
        <image src="/static/img/icon_share.png" mode="heightFix" />
      </button>
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
          name: "",
          is_collect: null,
          answer_document_id: null,
          document_url: "",
        };
      },
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  onReady() {
    console.log(this.content);
    this.loading = false;
  },
  methods: {
    async geDocumentUrl(document_id) {
      // if (!this.content.answer_document_id) return;
      // if (this.content.document_url) {
      //   this.openDocument(this.content.document_url);
      //   return;
      // }
      wx.showToast({
        title: "请稍候...",
        icon: "loading",
        duration: 10000,
      });
      try {
        let res = await apis.geDocumentUrl(document_id);

        this.openDocument(res.data.url);
        await apis.documentScan(document_id);
      } catch (error) {
        console.log(error);
        wx.hideToast();
      }
    },
    openDocument(document_url) {
      wx.downloadFile({
        url: document_url,
        success: function (res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log("打开文档成功");
              wx.hideToast();
            },
          });
        },
      });
    },
    async documentCollect() {
      await apis.documentCollect(this.content.id);
      this.$emit("collected");
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  margin-bottom: 21rpx;
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
  .answer-btn {
    margin-left: 32rpx;
  }
  .option-btns {
    display: flex;
    align-items: center;
    margin-left: 32rpx;
    .btn {
      height: 52rpx;
      width: 52rpx;
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
button {
  background: transparent;
  color: #fff;
  line-height: 1;
  margin: 0;
  padding: 0;
}
</style>