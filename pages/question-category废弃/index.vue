<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-90">我的分类</view>
      <view class="option-btns" @click="navigateTo('/select-categories/index')">
        <text class="font-size-40">选择更多</text>
        <image class="icon" src="/static/img/icon_menu.png" mode="heightFix" />
      </view>
    </view>
    <view class="content">
      <view v-if="!!myCategory.length" class="list">
        <view
          class="list-item"
          v-for="item in myCategory"
          :key="item.id"
          @click="toMyTestPaper(item)"
        >
          <text class="text">{{item.name}}</text>
        </view>
      </view>
      <view v-else class="no-data">
        <view class="text font-size-60">暂无分类</view>
        <view class="option-btn font-size-40" @click="navigateTo('/select-categories/index')">去选择</view>
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
export default {
  data() {
    return {
      categoryAll: [],
      myCategoryId: [],
    };
  },
  computed: {
    myCategory() {
      return this.myCategoryId.map((item) => {
        return this.categoryAll.find((category) => category.id == item);
      });
    },
  },
  // onLoad() {
  //   this.init();
  // },
  onShow(){
    this.init()
  },
  methods: {
    async init() {
      let { data: categoryTree } = await apis.dictionary("category");
      // TODO: 接口更改
      // this.categoryAll = categoryTree
      let categoryAll = [];
      categoryTree.forEach((category1) => {
        category1.child.forEach((category2) => {
          category2.child.forEach((category) => {
            categoryAll.push(category);
          });
        });
      });
      console.log(categoryAll);
      this.categoryAll = categoryAll;

      let {
        data: { list: myCategoryId },
      } = await apis.listMyCategory();
      this.myCategoryId = myCategoryId;
    },
    toMyTestPaper(category) {
      wx.navigateTo({
        url: "/my-test-paper/index?category_id=" + category.id,
        success: function (res) {
          res.eventChannel.emit("currentClassification", {
            name: category.name,
          });
        },
      });
    },
    navigateTo(url) {
      wx.navigateTo({
        url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  .header {
    padding: 26rpx 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .option-btns {
      .icon {
        height: 24rpx;
        margin-left: 4rpx;
      }
    }
  }
  .content {
    flex: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.list {
  margin-top: 16rpx;
  .list-item {
    padding: 34rpx 32rpx;
    background-color: #202041;
    border-radius: 28rpx;
    & + .list-item {
      margin-top: 21rpx;
    }
  }
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .text {
    color: #ffffff;
    opacity: 0.1;
  }
  .option-btn {
    margin-top: 20rpx;
    text-decoration-line: underline;
  }
}
</style>