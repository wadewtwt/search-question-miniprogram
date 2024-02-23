<template>
  <view class="page">
    <view class="header">
      <view class="search-container" :class="{'active':inputFocus}">
        <view class="search-content">
          <view class="icon">
            <image
              :src="inputFocus?'/static/img/icon_search.png':'/static/img/icon_search_white.png'"
              mode="heightFix"
            />
          </view>
          <view class="input-content">
            <input
              v-model="searchContent"
              type="text"
              @focus="onInputFocus"
              @input="onInputChange"
              @blur="onInputBlur"
            />
          </view>
        </view>
        <view class="selection-panel" v-show="searchSelection">
          <view class="selection-panel-content">
            <view
              class="selection-item font-size-50"
              v-for="item in searchOptions"
              :key="item.id"
              @click="chooseSearchItem(item)"
            >{{item.name}}</view>
          </view>
        </view>
      </view>

      <view class="classification-container">
        <view class="classification-content">
          <view class="classification-1-content" v-if="!!category1Arr.length">
            <view
              class="classification-1-content-item font-size-50"
              :class="{'active':category1Selected==item.id}"
              v-for="item in category1Arr"
              :key="item.id"
              @click="selectCategory1(item.id)"
            >{{item.name}}</view>
          </view>
          <view class="classification-2-content" v-if="!!category2Arr.length">
            <view
              class="classification-2-content-item font-size-50"
              :class="{'active':category2Selected==item.id}"
              v-for="item in category2Arr"
              :key="item.id"
              @click="selectCategory2(item.id)"
            >{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="categories-list">
        <view
          class="categories-list-item"
          :class="{'active': selectedIds.indexOf(item.id)>-1}"
          v-for="item in categoryData"
          :key="item.id"
          @click="handleSelect(item)"
        >
          <view class="text font-size-50">{{item.name}}</view>
          <view class="icon" v-if="selectedIds.indexOf(item.id)>-1">
            <image src="/static/img/icon_ok.png" mode="heightFix" />
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="operation-container">
        <view class="operation-content font-size-40">
          <view
            class="selected-num"
            @click="showSelectedItems = !showSelectedItems"
          >已选 {{selectedItems.length}}</view>
          <view class="save-btn">
            <view class="text" @click="save">保存</view>
          </view>
          <view class="selected-panel" v-show="showSelectedItems">
            <view class="selected-panel-item" v-for="item in selectedItems" :key="item.id">
              <view class="text">{{item.name}}</view>
              <view class="icon" @click="deleteSelectedById(item)">
                <image src="/static/img/icon_close.png" mode="heightFix" />
              </view>
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
      inputFocus: false,
      searchSelection: false,
      searchContent: "",
      categoryTree: [],
      category1Selected: "",
      category2Selected: "",
      selectedItems: [],
      showSelectedItems: false,
      searchOptions: [],
    };
  },
  computed: {
    category1Arr() {
      var arr = [];
      arr = [...this.categoryTree];
      return arr;
    },
    category2Arr() {
      var arr = [];
      if (this.category1Selected) {
        arr =
          this.categoryTree.find((item) => item.id == this.category1Selected)
            .child || [];
      }
      return arr;
    },
    categoryData() {
      var arr = [];
      if (this.category2Selected) {
        arr =
          this.category2Arr.find((item) => item.id == this.category2Selected)
            .child || [];
      }
      return arr;
    },
    categoryDataAll() {
      var arr = [];
      this.categoryTree.forEach((category1) => {
        category1.child.forEach((category2) => {
          category2.child.forEach((item) => {
            arr.push(item);
          });
        });
      });
      return arr;
    },
    selectedIds() {
      return this.selectedItems.map((item) => item.id);
    },
  },
  onLoad() {
    this.getCategoryTree();
  },
  methods: {
    async getCategoryTree() {
      let res = await apis.dictionary("category");
      // TODO: 接口更改
      this.categoryTree = res.data;
      console.log(res);

      this.category1Selected = this.categoryTree[0].id;
      this.category2Selected = this.categoryTree[0].child[0].id;

      this.loadSelectedItems();
    },
    async loadSelectedItems() {
      let {
        data: { list: myCategory },
      } = await apis.listMyCategory();
      this.selectedItems = myCategory.map((id) => {
        console.log(this.categoryDataAll.find((item) => item.id == id));
        return this.categoryDataAll.find((item) => item.id == id);
      });
    },
    handleSelect(selection) {
      let index = this.selectedItems.findIndex(
        (item) => item.id == selection.id
      );
      if (index > -1) {
        this.selectedItems = this.selectedItems.filter(
          (item) => item.id !== selection.id
        );
      } else {
        this.selectedItems = [...this.selectedItems, selection];
      }
    },
    deleteSelectedById(selection) {
      this.selectedItems = this.selectedItems.filter(
        (item) => item.id !== selection.id
      );
    },
    async save() {
      await apis.saveMyCategory(this.selectedIds);
      wx.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2000,
      });
      wx.navigateBack({
        delta: 1,
      });
    },
    onInputFocus() {
      this.inputFocus = true;
      // this.searchSelection = true;
    },
    async onInputChange(e) {
      let { data: searchOptions } = await apis.searchCategory(e.detail.value);
      this.searchOptions = searchOptions;
      if (this.searchOptions.length > 0) {
        this.searchSelection = true;
      }
    },
    onInputBlur() {
      this.inputFocus = false;
      this.searchSelection = false;
    },
    chooseSearchItem(selection) {
      let index = this.selectedItems.findIndex(
        (item) => item.id == selection.id
      );
      if (index > -1) {
      } else {
        this.selectedItems = [...this.selectedItems, selection];
      }
      this.searchSelection = false;
      this.searchContent = "";
    },
    selectCategory1(id) {
      this.category1Selected = id;
      this.category2Selected = this.categoryTree.find(
        (item) => item.id == id
      ).child[0].id;
      // this.classification2 = this.classification.find(
      //   (item) => item.value == this.classification1
      // ).children[0].value;
    },
    selectCategory2(id) {
      this.category2Selected = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  .header {
    position: relative;
  }
  .content {
    flex: 1;
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .search-container {
    height: 78rpx;
    padding-top: 36rpx;
    position: relative;
    .search-content {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16.6rpx;
      background-color: #393955;
      border-radius: 13rpx;
      .icon {
        height: 40rpx;
        image {
          height: 100%;
          width: auto;
        }
      }
      .input-content {
        flex: 1;
        padding-left: 23rpx;
      }
    }
    &.active {
      .search-content {
        background-color: #fff;
        .input-content {
          color: #07072b;
        }
      }
    }
    .selection-panel {
      position: absolute;
      top: 125rpx;
      left: 65rpx;
      right: 0;
      z-index: 99;
      .selection-panel-content {
        background-color: #ffffff;
        border-radius: 13rpx;
        color: #07072b;
        padding: 0 16.6rpx;
        .selection-item {
          padding: 14rpx 0;
        }
      }
    }
  }
  .classification-container {
    margin-top: 13.3rpx;
    .classification-content {
      .classification-1-content {
        display: flex;
        // justify-content: space-between;
        .classification-1-content-item {
          padding: 34rpx 12rpx;
          background-color: #202041;
          border-radius: 14rpx;
          white-space: nowrap;
          & + .classification-1-content-item {
            margin-left: 8px;
          }
          &.active {
            background-color: #fff;
            color: #07072b;
          }
        }
      }
      .classification-2-content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 0 0 14rpx 14rpx;
        background-color: #fff;
        margin-top: -26rpx;
        position: relative;
        z-index: 9;
        padding: 14rpx 0;
        .classification-2-content-item {
          color: #999;
          &.active {
            color: #07072b;
          }
        }
      }
    }
  }
  .operation-container {
    padding-bottom: 96rpx;
    .operation-content {
      background-color: #393955;
      border-radius: 14rpx;
      display: flex;
      align-items: center;
      position: relative;
      height: 62rpx;
      line-height: 62rpx;
      .selected-num {
        flex: 1;
        color: #fff;
        padding: 16rpx 31rpx;
      }
      .save-btn {
        width: 252rpx;
        padding: 16rpx 0;
        text-align: center;
        .text {
          background-color: #fff;
          color: #393955;
          border-top-right-radius: 14rpx;
          border-bottom-right-radius: 14rpx;
        }
      }
      .selected-panel {
        position: absolute;
        right: 252rpx;
        bottom: 62rpx;
        background-color: #393955;
        padding: 14rpx 0;
        border-top-left-radius: 14rpx;
        border-top-right-radius: 14rpx;
        .selected-panel-item {
          width: 390rpx;
          padding: 8rpx 21.33rpx;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .text {
            flex: 1;
            line-height: 28rpx;
          }
          .icon {
            width: 26.66rpx;
            height: 26.66rpx;
            background-color: #fff;
            border-radius: 50%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            image {
              height: 80%;
              flex: 1;
            }
          }
        }
      }
    }
  }
}
.categories-list {
  padding: 8rpx 0;
  .categories-list-item {
    & + .categories-list-item {
      margin-top: 8rpx;
    }
    display: flex;
    align-items: center;
    background-color: #393955;
    padding: 16rpx 27rpx;
    border-radius: 14rpx;
    &.active {
      background-color: #fff;
      .text {
        color: #07072b;
      }
    }
    .text {
      flex: 1;
      color: #ffffff;
      opacity: 0.5;
    }
    .icon {
      width: 53rpx;
      text-align: right;
      image {
        height: 26rpx;
        width: auto;
      }
    }
  }
}
</style>