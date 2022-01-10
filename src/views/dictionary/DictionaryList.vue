<template>
  <page-view>
    <!-- 新增字典弹窗 -->
    <add-dictionary-modal ref="addDictionaryModal" @ok="refreshTable" />
    <!-- 编辑字典弹窗 -->
    <edit-dictionary-modal ref="editDictionaryModal" @ok="refreshTable" />
    <!-- 列表页面 -->
    <split-layout>
      <div slot="top">
        <query-form @query="onQuery" @reset="onResetForm">
          <query-form-item label="名称">
            <a-input v-decorator="['name']" placeholder="请输入名称" />
          </query-form-item>
          <query-form-item label="代码">
            <a-input v-decorator="['code']" placeholder="请输入代码" />
          </query-form-item>
          <query-form-item label="描述信息">
            <a-input v-decorator="['description']" placeholder="请输入描述信息" />
          </query-form-item>
          <query-form-item label="状态">
            <a-select style="width: 100%" v-decorator="['status', { initialValue: '' }]">
              <a-select-option value="">全部</a-select-option>
              <a-select-option :value="0">启用</a-select-option>
              <a-select-option :value="1">停用</a-select-option>
            </a-select>
          </query-form-item>
        </query-form>
      </div>
      <div>
        <div class="tool-bar">
          <a-button type="primary" @click="$refs.addDictionaryModal.show()" :loading="loadingDictionary.add">
            新增
          </a-button>
          <a-dropdown v-if="this.$refs.dictionaryTable && this.$refs.dictionaryTable.getSelectedRowKeys().length">
            <a-menu slot="overlay">
              <a-menu-item @click="onBatchRemove">删除</a-menu-item>
            </a-menu>
            <a-button> 批量操作 <a-icon type="down" /> </a-button>
          </a-dropdown>
        </div>
        <custom-table
          ref="dictionaryTable"
          :showAlert="true"
          :showSelection="true"
          :loading="loadingDictionary.page"
          :columns="columns"
          :dataSource="dictionaryPage"
          @change="onTableChange"
        >
          <template slot="description" slot-scope="text">
            <ellipsis :length="10" :tooltip="true">{{ text }}</ellipsis>
          </template>
          <template slot="status" slot-scope="text">
            <a-badge :status="text === 0 ? 'success' : 'error'" />
            {{ text === 0 ? '启用' : '停用' }}
          </template>
          <template slot="action" slot-scope="text, record">
            <a @click="onEdit($event, record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="onRemove($event, record)">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </custom-table>
      </div>
    </split-layout>
  </page-view>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import AddDictionaryModal from './components/AddDictionaryModal';
  import EditDictionaryModal from './components/EditDictionaryModal';
  import CustomTable from '@/components/base/Table/CustomTable';
  import Ellipsis from '@/components/base/Ellipsis';
  import QueryForm from '@/components/base/QueryForm';
  const QueryFormItem = QueryForm.Item;

  export default {
    name: 'DictionaryList',
    components: {
      AddDictionaryModal,
      EditDictionaryModal,
      CustomTable,
      Ellipsis,
      QueryForm,
      QueryFormItem,
    },
    data() {
      return {
        dictionaryPage: [],
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '代码',
            dataIndex: 'code',
          },
          {
            title: '值',
            dataIndex: 'value',
          },
          {
            title: '描述',
            width: '120px',
            dataIndex: 'description',
            scopedSlots: { customRender: 'description' },
          },
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '操作',
            width: '150px',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
        filter: {
          form: {},
          page: {},
        },
      };
    },
    created() {
      this.refreshTable();
    },
    mounted() {},
    computed: {
      ...mapState({
        loadingDictionary: (state) => state.SysDictionary.loading,
      }),
    },
    methods: {
      ...mapActions({
        handlePage: 'SysDictionary/page',
        handleRemove: 'SysDictionary/remove',
      }),
      onTableChange(pageFilter) {
        this.filter.page = pageFilter;
        this.refreshTable();
      },
      onQuery(values) {
        this.filter.form = values;
        this.filter.page.currentPage = 1;
        this.refreshTable();
      },
      onResetForm() {
        this.filter.form = {};
        this.refreshTable();
      },
      refreshTable() {
        this.handlePage({ ...this.filter.form, ...this.filter.page }).then((res) => {
          this.dictionaryPage = res;
        });
      },
      onEdit(event, data) {
        event.stopPropagation();
        this.$refs.editDictionaryModal.show(data);
      },
      onRemove(event, data) {
        event.stopPropagation();
        this.handleRemove({ ids: [data.id] }).then(() => {
          this.refreshTable();
          this.$message.success('删除字典成功');
        });
      },
      onBatchRemove() {
        const quest = (resolve) => {
          this.handleRemove({ ids: this.$refs.dictionaryTable.getSelectedRowKeys() })
            .then(() => {
              this.refreshTable();
              this.$message.success('删除字典成功');
            })
            .finally(resolve());
        };
        this.$confirm({
          title: '字典删除',
          content: '确定要删除选中的字典吗？',
          onOk() {
            return new Promise((resolve) => {
              quest(resolve);
            });
          },
        });
      },
    },
  };
</script>
