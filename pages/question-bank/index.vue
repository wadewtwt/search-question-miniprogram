<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-90">题库分类</view>
      <view class="option-btns" @click="toMyQuestionBank">
        <text class="font-size-40">我的题库</text>
        <image class="icon" src="/static/img/icon_menu.png" mode="heightFix" />
      </view>
    </view>
    <view class="content">
      <view class="collapse">
        <view class="collapse-item" v-for="(item,index) in categoryTree" :key="index">
          <view
            class="collapse-item-text"
            @click="collapseActived = collapseActived==index?-1:index"
          >{{item.name}}</view>
          <van-transition :show="collapseActived == index" :duration="200">
            <view class="collapse-item-content" v-if="item.child&&item.child.length>0">
              <view
                class="collapse-item-content-item"
                v-for="categoryOne in item.child"
                :key="categoryOne.id"
                @click="toCategoryDetails(categoryOne)"
              >{{categoryOne.name}}</view>
            </view>
            <view class="none-data" v-else>暂无分类</view>
          </van-transition>
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
      categoryTree: [],
      collapseActived: -1,
      myCategorys: [],
    };
  },
  methods: {
    async init() {
      let { data: categoryTree } = await apis.dictionary("category");
      this.categoryTree = categoryTree;

      await this.listMyCategory();

      return categoryTree;
    },
    async listMyCategory() {
      let {
        data: { list: myCategorys },
      } = await apis.listMyCategory();
      this.myCategorys = myCategorys;
      return myCategorys;
    },
    async saveMyCategory(id) {
      function unique(arr) {
        return Array.from(new Set(arr));
      }
      this.myCategorys = unique([...this.myCategorys, id]);
      await apis.saveMyCategory(this.myCategorys);
      // await this.listMyCategory();
      return this.myCategorys;
    },
    async toCategoryDetails(data) {
      console.log(JSON.stringify(data));
      await this.saveMyCategory(data.id);
      wx.navigateTo({
        url:
          "/question-bank/document-list/index?queryBean=" +
          JSON.stringify(data),
      });
    },
    toMyQuestionBank() {
      wx.navigateTo({
        url: "/question-bank/mine/index",
      });
    },
  },
  onShow() {
    this.init();
    wx.setTabBarStyle({
      color: "#ffffff",
      backgroundColor: "#07072b",
      borderStyle: "black",
      selectedColor: "#ffffff",
      complete: () => {
        wx.setTabBarItem({
          index: 0,
          text: "首页",
          iconPath: "static/img/tabbar/home.png",
          selectedIconPath: "static/img/tabbar/home.png",
          complete: () => {
            wx.setTabBarItem({
              index: 1,
              text: "题库",
              iconPath: "static/img/tabbar/question_category.png",
              selectedIconPath: "static/img/tabbar/question_category.png",
              complete: () => {
                wx.setTabBarItem({
                  index: 2,
                  text: "个人中心",
                  iconPath: "static/img/tabbar/personal_center.png",
                  selectedIconPath: "static/img/tabbar/personal_center.png",
                })
              },
            })
          },
        })
      },
    })
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },

  async onPullDownRefresh() {
    this.collapseActived = -1;
    await this.init();
    wx.stopPullDownRefresh();
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
.collapse {
  .collapse-item {
    .collapse-item-text {
      padding: 34rpx 32rpx;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 28rpx;
      font-size: 36rpx;
    }

    & + .collapse-item {
      margin-top: 20rpx;
    }
    .collapse-item-content {
      padding: 10rpx 0;
      .collapse-item-content-item {
        padding: 17rpx 16rpx;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 36rpx;
        font-size: 28rpx;
        & + .collapse-item-content-item {
          margin-top: 10rpx;
        }
      }
    }
    .none-data {
      padding: 17rpx 16rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>