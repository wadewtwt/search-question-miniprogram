<template>
<uni-shadow-root class="@vant-weapp-dist-picker-index"><view class="van-picker custom-class">
  <include v-if="toolbarPosition === 'top'" src="toolbar.wxml"></include>

  <view v-if="loading" class="van-picker__loading">
    <loading color="#1989fa"></loading>
  </view>

  <view class="van-picker__columns" :style="computed.columnsStyle({ itemHeight, visibleItemCount })" @touchmove.stop.prevent="noop">
    <picker-column v-for="(item,index) in (computed.columns(columns))" :key="item.index" class="van-picker__column" :data-index="index" custom-class="column-class" :value-key="valueKey" :initial-options="item.values" :default-index="item.defaultIndex || defaultIndex" :item-height="itemHeight" :visible-item-count="visibleItemCount" active-class="active-class" @change="onChange"></picker-column>
    <view class="van-picker__mask" :style="computed.maskStyle({ itemHeight, visibleItemCount })"></view>
    <view class="van-picker__frame van-hairline--top-bottom" :style="computed.frameStyle({ itemHeight })"></view>
  </view>

  <include v-if="toolbarPosition === 'bottom'" src="toolbar.wxml"></include>
</view></uni-shadow-root>
</template>
<wxs src="./index.wxs" module="computed"></wxs>
<script>
import PickerColumn from '../picker-column/index.vue'
import Loading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'picker-column': PickerColumn,'loading': Loading}}

global['__wxRoute'] = '@vant/weapp/dist/picker/index'
import { VantComponent } from '../common/component';
import { pickerProps } from './shared';
VantComponent({
  classes: ['active-class', 'toolbar-class', 'column-class'],
  props: Object.assign(Object.assign({}, pickerProps), {
    valueKey: {
      type: String,
      value: 'text',
    },
    toolbarPosition: {
      type: String,
      value: 'top',
    },
    defaultIndex: {
      type: Number,
      value: 0,
    },
    columns: {
      type: Array,
      value: [],
      observer(columns = []) {
        this.simple = columns.length && !columns[0].values;
        if (Array.isArray(this.children) && this.children.length) {
          this.setColumns().catch(() => {});
        }
      },
    },
  }),
  beforeCreate() {
    Object.defineProperty(this, 'children', {
      get: () => this.selectAllComponents('.van-picker__column') || [],
    });
  },
  methods: {
    noop() {},
    setColumns() {
      const { data } = this;
      const columns = this.simple ? [{ values: data.columns }] : data.columns;
      const stack = columns.map((column, index) =>
        this.setColumnValues(index, column.values)
      );
      return Promise.all(stack);
    },
    emit(event) {
      const { type } = event.currentTarget.dataset;
      if (this.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0),
        });
      } else {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes(),
        });
      }
    },
    onChange(event) {
      if (this.simple) {
        this.$emit('change', {
          picker: this,
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0),
        });
      } else {
        this.$emit('change', {
          picker: this,
          value: this.getValues(),
          index: event.currentTarget.dataset.index,
        });
      }
    },
    // get column instance by index
    getColumn(index) {
      return this.children[index];
    },
    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'));
      }
      return column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).data.currentIndex;
    },
    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);
      if (column == null) {
        return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
      }
      return column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues(index) {
      return (this.children[index] || {}).data.options;
    },
    // set options of column by index
    setColumnValues(index, options, needReset = true) {
      const column = this.children[index];
      if (column == null) {
        return Promise.reject(new Error('setColumnValues: 对应列不存在'));
      }
      const isSame =
        JSON.stringify(column.data.options) === JSON.stringify(options);
      if (isSame) {
        return Promise.resolve();
      }
      return column.set({ options }).then(() => {
        if (needReset) {
          column.setIndex(0);
        }
      });
    },
    // get values of all columns
    getValues() {
      return this.children.map((child) => child.getValue());
    },
    // set values of all columns
    setValues(values) {
      const stack = values.map((value, index) =>
        this.setColumnValue(index, value)
      );
      return Promise.all(stack);
    },
    // get indexes of all columns
    getIndexes() {
      return this.children.map((child) => child.data.currentIndex);
    },
    // set indexes of all columns
    setIndexes(indexes) {
      const stack = indexes.map((optionIndex, columnIndex) =>
        this.setColumnIndex(columnIndex, optionIndex)
      );
      return Promise.all(stack);
    },
  },
});
export default global['__wxComponents']['@vant/weapp/dist/picker/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-picker{position:relative;overflow:hidden;-webkit-text-size-adjust:100%;-webkit-user-select:none;user-select:none;background-color:#fff;background-color:var(--picker-background-color,#fff)}.van-picker__toolbar{display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;height:44px;height:var(--picker-toolbar-height,44px);line-height:44px;line-height:var(--picker-toolbar-height,44px)}.van-picker__cancel,.van-picker__confirm{padding:0 16px;padding:var(--picker-action-padding,0 16px);font-size:14px;font-size:var(--picker-action-font-size,14px)}.van-picker__cancel--hover,.van-picker__confirm--hover{opacity:.7}.van-picker__confirm{color:#576b95;color:var(--picker-confirm-action-color,#576b95)}.van-picker__cancel{color:#969799;color:var(--picker-cancel-action-color,#969799)}.van-picker__title{max-width:50%;text-align:center;font-weight:500;font-weight:var(--font-weight-bold,500);font-size:16px;font-size:var(--picker-option-font-size,16px)}.van-picker__columns{position:relative;display:-webkit-flex;display:flex}.van-picker__column{-webkit-flex:1 1;flex:1 1;width:0}.van-picker__loading{position:absolute;top:0;right:0;bottom:0;left:0;z-index:4;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;background-color:hsla(0,0%,100%,.9);background-color:var(--picker-loading-mask-color,hsla(0,0%,100%,.9))}.van-picker__mask{top:0;left:0;z-index:2;width:100%;height:100%;background-image:linear-gradient(180deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.4)),linear-gradient(0deg,hsla(0,0%,100%,.9),hsla(0,0%,100%,.4));background-repeat:no-repeat;background-position:top,bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden}.van-picker__frame,.van-picker__mask{position:absolute;pointer-events:none}.van-picker__frame{top:50%;right:16px;left:16px;z-index:1;-webkit-transform:translateY(-50%);transform:translateY(-50%)}
</style>