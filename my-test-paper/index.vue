<template>
  <view class="page">
    <view class="header">
      <view class="title font-size-90">我的试卷</view>
      <view class="classification">
        <view class="classification-1">
          <view class="classification-1-item" :class="{'actived': type==1}" @click="type=1">
            <view>
              <view class="font-size-75">Question</view>
              <view class="font-size-75">Papers</view>
            </view>
          </view>
          <view
            class="classification-1-item font-size-75"
            :class="{'actived': type==2}"
            @click="type=2"
          >
            <text>Others</text>
          </view>
          <view class="year-selection" @click="yearSelectionVisible = true">
            <text v-if="year" class="font-size-40">{{year}}</text>
            <image class="icon" src="/static/img/icon_calendar.png" mode="heightFix" />
          </view>
          <van-popup :show="yearSelectionVisible" @close="yearSelectionVisible = false">
            <view class="year-selection-panel">
              <view class="label">选择年份</view>
              <view class="year-selection-panel-content">
                <view
                  class="year-selection-panel-item"
                  v-for="(item,index) in years"
                  :key="index"
                  :class="{'actived':item==year}"
                  @click="year=item;yearSelectionVisible= false;documentList();"
                >{{item}}</view>
                <view class="top-wrap"></view>
                <view class="bottom-wrap"></view>
              </view>
            </view>
          </van-popup>
        </view>
        <view class="classification-2" v-if="type==1">
          <!-- summer传1，march传2， winter传3 -->
          <view
            class="classification-2-item font-size-60"
            :class="{'actived': season==1}"
            @click="season=1"
          >Summer</view>
          <view
            class="classification-2-item font-size-60"
            :class="{'actived': season==2}"
            @click="season=2"
          >March</view>
          <view
            class="classification-2-item font-size-60"
            :class="{'actived': season==3}"
            @click="season=3"
          >Winter</view>
        </view>
        <view class="classification-2" v-else>
          <view class="classification-2-item font-size-60"></view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="paper-list">
        <examination-cell
          :content="item"
          v-for="(item,index) in list"
          :key="index"
          @collected="documentList"
        ></examination-cell>
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
      category_id: "3",
      type: 1,
      year: null,
      season: 1,
      yearSelectionVisible: false,
      years: [],
      list: [],
    };
  },
  watch: {
    type: function () {
      this.documentList();
    },
    season: function () {
      this.documentList();
    },
    year: function () {
      this.documentList();
    },
  },
  onLoad({ category_id }) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on &&
      eventChannel.once("currentClassification", function (data) {
        wx.setNavigationBarTitle({
          title: data.name,
        });
      });
    this.category_id = category_id;
    // this.documentList();
    this.listYear();
  },
  methods: {
    async documentList() {
      let params = {};
      if (this.category_id) params.category_id = this.category_id;
      if (this.type == 1) {
        params.type = this.type;
        params.season = this.season;
      }
      if(this.type == 2){
        params.type = this.type;
      }
      if (this.year) params.year = this.year;
      //       {
      //     "category_id":3,
      //     "type":1,
      //     "year":2018,
      //     "season":2
      // }
      let res = await apis.documentList(params);
      this.list = res.data.list;
    },
    onScroll(e) {
      //   console.log(e);
      // console.log(e.detail.scrollHeight);
      //   console.log(e.detail.scrollTop);
      //   this.scale =1 + (e.detail.scrollTop / (e.detail.scrollHeight - 568)) * 1;
    },
    async listYear() {
      let res = await apis.listYear({
        category_id: this.category_id,
      });
      this.years = res.data.year_list;
      console.log(this.years);
      this.year = res.data.year_list[res.data.year_list.length - 1];
    },
    async documentCollect(id) {
      await apis.documentCollect(id);
      await this.documentList();
    },
  },
  components: { ExaminationCell },
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
  }
}
.classification {
  margin-top: 26rpx;
  .classification-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .classification-1-item {
      background-color: #393955;
      color: #afafb7;
      border-radius: 14rpx 14rpx 0 0;
      padding: 0 43rpx;
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
    .year-selection {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon {
        height: 40rpx;
        margin-left: 10rpx;
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
      // height: 79rpx;
      min-height: 14rpx;
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
.paper-list {
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
.year-selection-panel {
  // position: absolute;
  // top:0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  position: relative;
  width: 750rpx;
  height: 850rpx;
  background-image: linear-gradient(
    rgba(0, 0, 0, 1) 0,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  .year-selection-panel-content {
    width: 160rpx;
    height: 850rpx;
    margin-left: 50rpx;

    overflow: auto;
    -webkit-overflow-scrolling: touch;
    // .top-wrap {
    //   height: 100rpx;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   z-index: 9;
    //   background-image: linear-gradient(
    //     rgba(0, 0, 0, 1) 0,
    //     rgba(0, 0, 0, 0) 100%
    //   );
    // }
    // .bottom-wrap {
    //   height: 100rpx;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   z-index: 9;
    //   background-image: linear-gradient(
    //     rgba(0, 0, 0, 0) 0,
    //     rgba(0, 0, 0, 1) 100%
    //   );
    // }
    // .year-selection-panel-wrap {
    //   height: 1200rpx;
    //   background-image: linear-gradient(
    //     rgba(0, 0, 0, 0.7) 0,
    //     rgba(0, 0, 0, 0) 50%,
    //     rgba(0, 0, 0, 0.7) 100%
    //   );
    // }
  }
  .year-selection-panel-item {
    width: 134rpx;
    height: 134rpx;
    line-height: 122rpx;
    box-sizing: border-box;
    border: solid 6rpx #afafb7;
    color: #afafb7;
    text-align: center;
    border-radius: 50%;
    font-size: 40rpx;
    mix-blend-mode: overlay;
    // transform: scale(0.5);
    // position: relative;
    // left: 50%;
    // transform: translateX(-50%);
    &.actived {
      border: solid 6rpx #fff;
      color: #fff;
    }
    & + .year-selection-panel-item {
      margin-top: 30rpx;
    }
  }
}
</style>