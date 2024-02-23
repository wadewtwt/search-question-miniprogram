<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-90">我的题库</view>
    </view>
    <view class="content">
      <view class="category-list">
        <view class="category-item">
          <slide-delete
            v-for="(item) in myCategorys"
            :key="item.id"
            @delete="deleteOne(item.id)"
            @toDetails="toCategoryDetails(item)"
          >{{item.name}}</slide-delete>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import SlideDelete from "./slide-delete";
export default {
  data() {
    return {
      categoryTree: [],
      myCategoryIds: [],
    };
  },
  computed: {
    myCategorys: function () {
      var categories = [];
      this.categoryTree.forEach((item) => {
        item.child.forEach((child) => {
          if (this.myCategoryIds.indexOf(child.id) > -1) {
            categories.push(child);
          }
        });
      });
      return categories;
    },
  },
  methods: {
    async init() {
      let { data: categoryTree } = await apis.dictionary("category");
      this.categoryTree = categoryTree;

      let {
        data: { list: myCategoryId },
      } = await apis.listMyCategory();
      console.log(myCategoryId);
      this.myCategoryIds = myCategoryId;
      return categoryTree;
    },
    async deleteOne(id) {
      console.log(id);
      this.myCategoryIds = this.myCategoryIds.filter((item) => item !== id);
      await this.saveMyCategory();
      await this.init();
    },
    async saveMyCategory() {
      await apis.saveMyCategory(this.myCategoryIds);
      return this.myCategorys;
    },
    async toCategoryDetails(data) {
      console.log(JSON.stringify(data));
      wx.navigateTo({
        url:
          "/question-bank/document-list/index?queryBean=" +
          JSON.stringify(data),
      });
    },
  },
  onLoad() {
    this.init();
  },
  async onPullDownRefresh() {
    await this.init();
    wx.stopPullDownRefresh();
  },
  components: {
    SlideDelete,
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
.category-list {
  padding: 10rpx 0;
  .category-item {
  }
}
</style>