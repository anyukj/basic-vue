<template>
  <div class="container">
    <a-layout>
      <a-layout-sider v-if="this.$slots.left" :width="leftWidth" :style="{ marginRight: leftInterval }">
        <slot name="left" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header v-if="this.$slots.top" :style="{ marginBottom: topInterval }">
          <slot name="top" />
        </a-layout-header>
        <a-layout-content>
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  export default {
    name: 'SplitLayout',
    props: {
      leftWidth: {
        type: String,
        default: '180px',
        required: false,
      },
      leftInterval: {
        type: String,
        default: '16px',
        required: false,
      },
      topInterval: {
        type: String,
        default: '8px',
        required: false,
      },
    },
  };
</script>

<style scoped lang="less">
  .container {
    text-align: left;
  }
  .container .ant-layout-header {
    height: auto;
    background: #fff;
    padding: 24px 24px 0;
    line-height: normal;
  }
  .container .ant-layout-sider {
    background: #fff;
    padding: 16px 0;
  }
  .container .ant-layout-content {
    background: #fff;
    padding: 24px;
  }
  .container > .ant-layout {
    margin-bottom: 48px;
  }
  .container > .ant-layout:last-child {
    margin: 0;
  }
</style>
