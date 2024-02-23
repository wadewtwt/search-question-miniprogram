<template>
  <view class="page">
    <view class="h1">使用指南</view>
    <view class="p">
      <view class="h2">登陆指南：</view>
      <view class="text">1. 点击个人中心通过微信授权登陆</view>
      <view class="text">2. 完善个人信息后可获取小程序完整功能</view>
    </view>
    <view class="p">
      <view class="h2">拍照搜题：</view>
      <view class="text">1. 在首页点击拍照搜题跳转拍摄页面</view>
      <view class="text">2. 请横屏拍摄照片，完整选定题目范围，一次只能提交一道题（注意公式、图表类题目识别率较低，推荐多拍摄文字题目）</view>
      <view class="text">3. 提交后系统识别题目文字，确认文字正确后提交</view>
      <view class="text">4. 查看匹配答案结果，如果没有查询结果，请检查题目是否正确提交</view>
    </view>
    <view class="p">
      <view
        class="text"
      >*题库在不断更新中，目前支持搜题的A level学科包括： Mathematics、 Further Mathematics、Physics、Chemistry、Biology、Economics、Computer Science、Business、Computing</view>
      <view class="text">*后续会支持更多笔试和竞赛的题目搜索，尽情期待~</view>
    </view>
    <view class="p">
      <view class="h2">题库查阅：</view>
      <view class="text">1. 点击底部菜单栏题库，选择科目/竞赛/笔试分类</view>
      <view class="text">2. 题库包含Past Papers和Mark Scheme，大纲等其他文件在Others Tab中</view>
      <view class="text">3. 点击五角星收藏试卷，在个人中心内可以查看收藏夹</view>
      <view class="text">4. 点击分享按钮即可分享给需要的小伙伴们</view>
    </view>
    <view class="p">
      <view class="h2">个人中心:</view>
      <view class="text">1. 点击个人信息可以随时修改你的信息</view>
      <view class="text">2. 点击我的收藏即可查看题目、试卷、答案等收藏夹</view>
      <view class="text">3. 点击历史记录即可查看历史题目、试卷、答案等</view>
      <view class="text">4. 点击分享战绩可分享给小伙伴你的累计打卡天数</view>
    </view>
    <view class="p">
      <view class="text">使用过程中如有其他问题或建议，欢迎在我们微信公众号“xxx”后台留言给我们~</view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
    .h1{
        font-size: 40rpx;
        line-height: 60rpx;
    }
    .h2{
        font-size: 32rpx;
        line-height: 50rpx;
    }
    .text{
        font-size: 24rpx;
        padding-left: 20rpx;
    }
    .p{
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}
</style>