<template>
  <a-modal title="选择图标" :visible="visible" :width="800" @ok="onSubmit" @cancel="hide">
    <icon-selector @change="onIconChange" :value="icon" />
  </a-modal>
</template>

<script>
  import IconSelector from './IconSelector';

  export default {
    name: 'IconSelectModal',
    components: { IconSelector },
    data() {
      return {
        visible: false,
        icon: '',
      };
    },
    methods: {
      show(icon) {
        this.icon = icon;
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      onIconChange(icon) {
        this.icon = icon;
      },
      onSubmit() {
        if (this.icon) {
          this.$emit('ok', this.icon);
          this.hide();
        } else {
          this.$message.warn('请选择图标');
        }
      },
    },
  };
</script>
