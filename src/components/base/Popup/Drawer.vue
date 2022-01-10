<template>
  <div>
    <a-drawer
      :title="title"
      :width="width"
      :maskClosable="true"
      placement="right"
      :closable="true"
      wrapClassName="dwBox"
      @close="onClose"
      :visible="visible"
    >
      <slot></slot>
    </a-drawer>
  </div>
</template>
<script>
  export default {
    name: 'Drawer',
    props: {
      // 标题
      title: {
        type: String,
        default: '标题',
      },
      // 宽度
      width: {
        type: Number,
        default: 640,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    created() {},
    mounted() {},
    methods: {
      show() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  };
</script>
<style lang="less"></style>
