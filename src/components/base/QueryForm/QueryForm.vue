<script>
  const Item = {
    name: 'QueryFormItem',
    props: {
      label: {
        type: String,
        default: '',
        required: false,
      },
    },
    inject: {
      md: {
        type: Number,
      },
    },
    render() {
      return (
        <div>
          <a-col md={this.md} sm={24}>
            <a-form-item label={this.label}>{this.$slots.default}</a-form-item>
          </a-col>
        </div>
      );
    },
  };

  export default {
    name: 'QueryForm',
    Item: Item,
    data() {
      return {
        // 最佳效果，一行3个或者4个
        rowShow: 4,
        advanced: false,
        queryForm: this.$form.createForm(this),
      };
    },
    provide() {
      return {
        md: Math.floor(24 / this.rowShow),
      };
    },
    methods: {
      toggleAdvanced() {
        this.advanced = !this.advanced;
      },
      getValues() {
        return this.queryForm.getFieldsValue();
      },
      handleQuery() {
        const {
          queryForm: { validateFields },
        } = this;

        validateFields((err, values) => {
          if (!err) {
            this.$emit('query', values);
          }
        });
      },
      handleReset() {
        this.$emit('reset');
        this.queryForm.resetFields();
      },
    },
    render() {
      const { advanced, rowShow, queryForm } = this;
      // 显示的组件为展开显示全部，收缩展示显示的（个数-1）放按钮
      const allItem = (this.$slots.default && this.$slots.default.length) || 0;
      const showItem = advanced ? allItem : rowShow - 1;
      const mdSize = Math.floor(24 / rowShow);
      const buttonMdSize = 24 - (showItem % rowShow) * mdSize;

      // 渲染按钮操作
      const renderButton = (
        <a-col md={buttonMdSize} sm={24}>
          <span class="table-page-search-submitButtons" style={advanced ? { float: 'right', overflow: 'hidden' } : {}}>
            <a-button type="primary" onClick={this.handleQuery}>
              查询
            </a-button>
            {allItem > 0 && (
              <a-button style="margin-left: 8px" onClick={this.handleReset}>
                重置
              </a-button>
            )}
            {allItem >= rowShow && (
              <a onClick={this.toggleAdvanced} style="margin-left: 8px">
                {advanced ? '收起' : '展开'}
                <a-icon type={advanced ? 'up' : 'down'} />
              </a>
            )}
          </span>
        </a-col>
      );

      return (
        <div class="table-page-search-wrapper">
          <a-form layout="inline" form={queryForm}>
            <a-row gutter={48}>
              {this.$slots.default && this.$slots.default.slice(0, showItem).map((dom) => <slot>{dom}</slot>)}
              {renderButton}
            </a-row>
          </a-form>
        </div>
      );
    },
  };
</script>

<style scoped></style>
