<script>
  import M from 'ant-design-vue/es/modal';
  export default {
    name: 'Modal',
    props: Object.assign(M.props, {}),
    data() {
      return {
        showFlag: false,
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      cancel() {
        this.showFlag = false;
        this.$emit('cancel');
      },
    },
    render() {
      const { cancel } = this;
      let props = {};
      Object.keys(M.props).forEach((key) => {
        if (key === 'visible') {
          props[key] = this.showFlag;
        } else {
          this[key] && (props[key] = this[key]);
        }
      });
      return (
        <a-modal {...{ props }} onOk={this.$emit('ok')} onCancel={cancel}>
          {Object.keys(this.$slots).map((name) => (
            <template slot={name}>{this.$slots[name]}</template>
          ))}
        </a-modal>
      );
    },
  };
</script>
<style lang="less"></style>
