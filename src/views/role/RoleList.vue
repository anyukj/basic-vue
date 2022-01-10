<template>
  <page-view>
    <!-- 新增角色弹窗 -->
    <add-role-modal ref="addRoleModal" @ok="refreshTable" />
    <!-- 修改角色弹窗 -->
    <edit-role-modal ref="editRoleModal" @ok="refreshTable" />
    <!-- 分配用户 -->
    <assign-user-modal ref="assignUserModal" />
    <!-- 分配菜单 -->
    <assign-menu-modal ref="assignMenuModal" />
    <!-- 列表页面 -->
    <split-layout>
      <div slot="top">
        <query-form @query="onQuery" @reset="onResetForm">
          <query-form-item label="角色名称">
            <a-input v-decorator="['name']" placeholder="请输入角色名称" />
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
          <a-button type="primary" @click="$refs.addRoleModal.show()" :loading="loadingRole.add"> 新增 </a-button>
        </div>
        <custom-table
          ref="roleTable"
          :showAlert="false"
          :showSelection="false"
          :loading="loadingRole.page"
          :columns="columns"
          :dataSource="rolePage"
          @change="onTableChange"
        >
          <template slot="status" slot-scope="text">
            <a-badge :status="text === 0 ? 'success' : 'error'" />
            {{ text === 0 ? '启用' : '停用' }}
          </template>
          <template slot="action" slot-scope="text, record">
            <a @click="onAssignUsers($event, record)">分配用户</a>
            <a-divider type="vertical" />
            <a @click="onAssignMenus($event, record)">分配菜单</a>
            <a-divider type="vertical" />
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
  import AddRoleModal from './components/AddRoleModal';
  import EditRoleModal from './components/EditRoleModal';
  import AssignUserModal from './components/AssignUserModal';
  import AssignMenuModal from './components/AssignMenuModal';
  import CustomTable from '@/components/base/Table/CustomTable';
  import QueryForm from '@/components/base/QueryForm';
  const QueryFormItem = QueryForm.Item;

  export default {
    name: 'RoleList',
    components: {
      AddRoleModal,
      EditRoleModal,
      AssignUserModal,
      AssignMenuModal,
      CustomTable,
      QueryForm,
      QueryFormItem,
    },
    data() {
      return {
        rolePage: [],
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
          },
          {
            title: '角色描述',
            dataIndex: 'description',
          },
          {
            title: '状态',
            dataIndex: 'status',
            sorter: true,
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '操作',
            width: '300px',
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
        loadingRole: (state) => state.SysRole.loading,
      }),
    },
    methods: {
      ...mapActions({
        handlePage: 'SysRole/page',
        handleRemove: 'SysRole/remove',
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
          this.rolePage = res;
        });
      },
      onEdit(event, data) {
        event.stopPropagation();
        this.$refs.editRoleModal.show(data);
      },
      onRemove(event, data) {
        event.stopPropagation();
        this.handleRemove({ ids: [data.id] }).then(() => {
          this.refreshTable();
          this.$message.success('删除角色成功');
        });
      },
      onAssignUsers(event, data) {
        event.stopPropagation();
        this.$refs.assignUserModal.show(data.id);
      },
      onAssignMenus(event, data) {
        event.stopPropagation();
        this.$refs.assignMenuModal.show(data.id);
      },
    },
  };
</script>
