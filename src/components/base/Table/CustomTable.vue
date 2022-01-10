<script>
  import T from 'ant-design-vue/es/table/Table';
  export default {
    name: 'CustomTable',
    components: {},
    props: Object.assign(T.props, {
      showAlert: {
        type: Boolean,
        default: true,
      },
      showPagination: {
        type: Boolean,
        default: true,
      },
      showSelection: {
        type: Boolean,
        default: true,
      },
      rowKey: {
        type: String,
        default: 'id',
      },
      dataSource: {
        type: [Object, Array],
        required: true,
        default() {
          return {
            total: 0,
            current: 1,
            size: 10,
            records: [],
          };
        },
      },
      hideColumns: {
        type: Array,
        default() {
          return [];
        },
      },
      onChange: {
        type: Function,
        default: null,
      },
      onRowClick: {
        type: Function,
        default: null,
      },
    }),
    data() {
      return {
        selectedRows: [],
        selectedRowKeys: [],
      };
    },
    computed: {
      pageInfo() {
        return {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `总共 ${total} 条`,
          total: this.dataSource.total || 0,
          current: this.dataSource.current || 1,
          pageSize: this.dataSource.size || 10,
        };
      },
      customColumns: (state) => {
        if (state.hideColumns && state.hideColumns.length > 0) {
          return state.columns.filter((item) => {
            if (item.dataIndex) {
              return !state.hideColumns.includes(item.dataIndex);
            } else if (item.title) {
              return !state.hideColumns.includes(item.title);
            } else {
              return true;
            }
          });
        } else {
          return state.columns;
        }
      },
    },
    methods: {
      getSelectedRowKeys() {
        return this.selectedRowKeys;
      },
      setSelectedRowKeys(keys) {
        this.selectedRowKeys = keys;
      },
      getSelectedRows() {
        return this.selectedRows;
      },
      onClearRowKeys() {
        // 清空选中内容
        this.selectedRowKeys = [];
        this.selectedRows = [];
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        // 选中内容
        this.selectedRowKeys = selectedRowKeys;
        if (this.rowKey) {
          // 分页数据选择selectedRows只返回当前页的数据，需要特殊处理。1合并数据，2过滤出已选中的数据，3去重
          let map = new Map();
          this.selectedRows = [...this.selectedRows, ...selectedRows]
            .filter((item) => this.selectedRowKeys.includes(item[this.rowKey]))
            .reduce((item, next) => {
              if (!map.has(next[this.rowKey])) {
                map.set(next[this.rowKey], true);
                item.push(next);
              }
              return item;
            }, []);
        }
      },
      onTableChange(pagination, filters, sorter) {
        // 表格分页、过滤、排序变化的时候触发change回调
        let query = {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          ...filters,
        };
        if (sorter.order) {
          query = {
            ...query,
            sorter: `${sorter.field}_${sorter.order}`,
          };
        }
        this.onChange && this.onChange(query);
        this.$emit('change', query);
      },
      onCustomRow(record) {
        return {
          on: {
            click: () => {
              this.onRowClick && this.onRowClick(record);
              this.$emit('rowClick', record);
            },
          },
        };
      },
      renderAlert() {
        // 绘制统计列数据
        return (
          <a-alert class="table-alert">
            <div slot="message" class="table-alert-info">
              <div class="table-alert-info-content">
                <span style="margin-right: 12px">
                  已选择 <a style="font-weight: 600">{this.selectedRowKeys.length}</a> 项
                </span>
              </div>
              {this.selectedRowKeys.length > 0 && (
                <div class="table-alert-info-option">
                  <a onClick={this.onClearRowKeys}>清空</a>
                </div>
              )}
            </div>
          </a-alert>
        );
      },
    },
    render() {
      const { showAlert, showPagination, showSelection, dataSource, onTableChange, pageInfo } = this;
      const rowSelection = {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.disabled,
          },
        }),
      };
      let props = {};
      Object.keys(T.props).forEach((key) => {
        if (key === 'dataSource') {
          props[key] = dataSource instanceof Array ? dataSource : dataSource.records || [];
        } else if (key === 'rowSelection') {
          props[key] = showSelection ? rowSelection : null;
        } else if (key === 'pagination') {
          props[key] = showPagination && !(dataSource instanceof Array) ? pageInfo : false;
        } else if (key === 'customRow') {
          props[key] = this[key] || this.onCustomRow;
        } else if (key === 'columns') {
          props[key] = this.customColumns;
        } else {
          this[key] && (props[key] = this[key]);
        }
      });

      return (
        <div>
          {showAlert ? this.renderAlert() : null}
          <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={onTableChange}>
            {Object.keys(this.$slots).map((name) => (
              <template slot={name}>{this.$slots[name]}</template>
            ))}
          </a-table>
        </div>
      );
    },
  };
</script>

<style scoped lang="less">
  .table-alert {
    margin-bottom: 16px;
    .table-alert-info {
      display: flex;
      .table-alert-info-content {
        flex: 1 1;
      }
      .table-alert-info-option {
        min-width: 48px;
        padding-left: 16px;
      }
    }
  }
</style>
