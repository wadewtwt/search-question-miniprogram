<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-50">{{queryBean.name}}</view>
      <view class="classification-container">
        <view class="classification-content" v-if="!!queryBean.child.length">
          <view class="classification-row">
            <view
              class="classification-col"
              :class="{'active':category1Selected==item.id}"
              v-for="item in queryBean.child"
              @click="category1Selected = item.id"
              :key="item.id"
            >{{item.name}}</view>
          </view>
          <view class="classification-row">
            <view
              class="classification-col"
              :class="{'active':category2Selected==item.value}"
              v-for="item in category2Data"
              @click="category2Selected = item.value"
              :key="item.value"
            >{{item.name}}</view>
          </view>
        </view>
        <view class="classification-content" v-else>
          <view class="classification-row">
            <view
              class="classification-col"
              :class="{'active':category2Selected==item.value}"
              v-for="item in category2Data"
              @click="category2Selected = item.value"
              :key="item.value"
            >{{item.name}}</view>
          </view>
          <view class="classification-row"></view>
        </view>
      </view>
    </view>
    <scroll-view class="content" scroll-y @scrolltolower="init">
      <examination-cell :content="item" v-for="(item,index) in list" :key="index" @collected="init"></examination-cell>
    </scroll-view>
  </view>
</template>

<script>
import apis from "$apis/index.js";
import ExaminationCell from "@/components/examination-cell/index.vue";
import { share } from "$utils/index.js";
export default {
  data() {
    return {
      queryBean: {
        name: "",
        child: [],
      },
      category2Data: [
        {
          name: "Question Papers",
          value: 1,
        },
        {
          name: "Mark Scheme",
          value: 2,
        },
        {
          name: "Others",
          value: 3,
        },
      ],
      category1Selected: null,
      category2Selected: 1,
      list: [],
      pageInfo: {
        page: 0,
        pageSize: 20,
      },
      loading: false,
    };
  },
  watch: {
    category1Selected: function () {
      this.pageInfo.page = 0;
      this.list = [];
      this.init();
    },
    category2Selected: function () {
      this.pageInfo.page = 0;
      this.list = [];
      this.init();
    },
  },
  methods: {
    async init() {
      if (this.loading) return;
      this.loading = true;

      let params = {};
      params.category_id = !!this.queryBean.child.length
        ? this.category1Selected
        : this.queryBean.id;
      params.type = this.category2Selected;
      let { data } = await apis.documentList({ ...params, ...this.pageInfo });

      this.loading = false;

      if (data.list.length == this.pageInfo.pageSize) {
        this.pageInfo.page += 1;
      }

      console.log(data);
      this.list = [...this.list, ...data.list];
      return data;
    },
  },
  onLoad(options) {
    // options.queryBean =
    //   '{"id":3,"parent_id":2,"name":"Biology (9700)","level":2,"child":[]}'; //TODO
    this.queryBean = JSON.parse(options.queryBean);
    if (!!this.queryBean.child.length)
      this.category1Selected = this.queryBean.child[0].id;
    wx.setNavigationBarTitle({
      title: this.queryBean.name,
    });
    this.init(this.queryBean);
  },
  async onPullDownRefresh() {
    await this.init();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function (res) {
    return share(res);
  },
  components: { ExaminationCell },
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  .header {
    padding: 26rpx 0;
    // display: flex;
    // align-items: flex-end;
    // justify-content: space-between;
    // .option-btns {
    //   .icon {
    //     height: 24rpx;
    //     margin-left: 4rpx;
    //   }
    // }
  }
  .content {
    flex: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    // padding: 26rpx 0;
  }
}
.classification-container {
  margin-top: 13.3rpx;
  .classification-content {
    .classification-row {
      display: flex;
      // justify-content: space-between;
      .classification-col {
        padding: 34rpx 12rpx;
        // background-color: #202041;
        border-top-left-radius: 14rpx;
        border-top-right-radius: 14rpx;
        white-space: nowrap;
        & + .classification-col {
          margin-left: 8px;
        }
        &.active {
          background-color: #fff;
          color: #07072b;
        }
      }
      & + .classification-row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 0 0 14rpx 14rpx;
        background-color: #fff;
        margin-top: -1rpx;
        position: relative;
        z-index: 9;
        padding: 1rpx 0;
        .classification-col {
          color: #999;
          &.active {
            color: #07072b;
          }
        }
      }
    }
  }
}
</style>