<template>
  <view class="slide-delete">
    <movable-area>
      <movable-view
        direction="horizontal"
        :inertia="true"
        :out-of-bounds="true"
        :x="xmove"
        :damping="100"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @change="handleMovableChange"
      >
        <view class="slide-delete-content" @click="$emit('toDetails')">
          <slot />
        </view>
      </movable-view>
    </movable-area>
    <view class="delete-btn" @click="deleteOne">删除</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      xmove: 0,
    };
  },
  methods: {
    handleTouchStart(e) {
      this.startX = e.touches[0].pageX;
    },
    handleMovableChange(e) {
      if (e.detail.source === "friction") {
        if (e.detail.x < -30) {
          this.showDeleteButton(e);
        } else {
          this.hideDeleteButton(e);
        }
      } else if (e.detail.source === "out-of-bounds" && e.detail.x === 0) {
        this.hideDeleteButton(e);
      }
    },
    handleTouchEnd(e) {
      if (
        e.changedTouches[0].pageX < this.startX &&
        e.changedTouches[0].pageX - this.startX <= -30
      ) {
        console.log(1);
        this.showDeleteButton(e);
      } else if (
        e.changedTouches[0].pageX > this.startX &&
        e.changedTouches[0].pageX - this.startX < 30
      ) {
        console.log(2);
        this.showDeleteButton(e);
      } else {
        console.log(3);
        this.hideDeleteButton(e);
      }
    },
    showDeleteButton() {
      this.xmove = -120;
    },
    hideDeleteButton() {
      this.xmove = 0;
    },
    deleteOne(){
        this.$emit('delete')
    }
  },
};
</script>

<style lang="scss" scoped>
.slide-delete {
  margin-bottom: 20rpx;
  width: 674rpx;
  position: relative;
  border-radius: 36rpx;
  overflow: hidden;
  border-style: none;
  //   padding: 17rpx 16rpx;
  //     background-color: rgba(255, 255, 255, 0.2);
  //     border-radius: 36rpx;
  //     font-size: 28rpx;
  movable-area {
    width: 554rpx;
    height: 68rpx;
    border-top-left-radius: 36rpx;
    border-bottom-left-radius: 36rpx;
    movable-view {
      width: 674rpx;
      height: 36rpx;
      background-color: #393955;
      padding: 18rpx 0;
      z-index: 999;
      //   border-radius: 36rpx;
      .slide-delete-content {
        padding: 0 16px;
      }
    }
  }
  .delete-btn {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 120rpx;
    display: flex;
    align-items:center;
    justify-content: center;
    background-color: #fff;
    color: #393955;
    border-top-right-radius: 36rpx;
    border-bottom-right-radius: 36rpx;
  }
}
</style>