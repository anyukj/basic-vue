<template>
  <page-view>
    <!-- 新增用户 -->
    <add-user-modal ref="addUserModal" @ok="refreshTable" />
    <!-- 编辑用户 -->
    <edit-user-modal ref="editUserModal" @ok="refreshTable" />
    <!-- 重置密码 -->
    <reset-password-modal ref="resetPasswordModal" />
    <!-- 用户详情 -->
    <show-user-item-modal ref="showUserItemModal" />
    <!-- 列表页面 -->
    <split-layout>
      <div slot="top">
        <query-form @query="onQuery" @reset="onResetForm">
          <query-form-item label="账号">
            <a-input v-decorator="['userName']" placeholder="请输入账号" />
          </query-form-item>
          <query-form-item label="姓名">
            <a-input v-decorator="['fullName']" placeholder="请输入姓名" />
          </query-form-item>
          <query-form-item label="状态">
            <a-select style="width: 100%" v-decorator="['status', { initialValue: '' }]">
              <a-select-option value="">全部</a-select-option>
              <a-select-option :value="0">启用</a-select-option>
              <a-select-option :value="1">停用</a-select-option>
            </a-select>
          </query-form-item>
          <query-form-item label="联系电话">
            <a-input v-decorator="['phone']" placeholder="请输入联系电话" />
          </query-form-item>
        </query-form>
      </div>
      <div>
        <div class="tool-bar">
          <a-button type="primary" @click="$refs.addUserModal.show()" :loading="loadingUser.add"> 新增 </a-button>
          <a-dropdown v-if="this.$refs.userTable && this.$refs.userTable.getSelectedRowKeys().length">
            <a-menu slot="overlay">
              <a-menu-item @click="onBatchRemove">删除</a-menu-item>
              <a-menu-item @click="onBatchResetPassword">重置密码</a-menu-item>
            </a-menu>
            <a-button> 批量操作 <a-icon type="down" /> </a-button>
          </a-dropdown>
        </div>
        <custom-table
          ref="userTable"
          :showAlert="true"
          :showSelection="true"
          :loading="loadingUser.page"
          :columns="columns"
          :dataSource="userPage"
          @change="onTableChange"
        >
          <template slot="roleName" slot-scope="text">
            <div v-if="text">
              <div v-for="(chunkName, chunkIndex) in _.chunk(_.split(text, ','), 5)" :key="chunkIndex">
                <a-tag v-for="(name, index) in chunkName" color="blue" :key="index">
                  {{ name }}
                </a-tag>
              </div>
            </div>
          </template>
          <template slot="status" slot-scope="text">
            <a-badge :status="text === 0 ? 'success' : 'error'" />
            {{ text === 0 ? '启用' : '停用' }}
          </template>
          <template slot="action" slot-scope="text, record">
            <a @click="onShowUserItem($event, record)">查看详情</a>
            <a-divider type="vertical" />
            <a :disabled="record.id === 1" @click="onResetPassword($event, record)">重置密码</a>
            <a-divider type="vertical" />
            <a :disabled="record.id === 1" @click="onEdit($event, record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              :disabled="record.id === 1"
              title="确定要删除吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onRemove($event, record)"
            >
              <a :disabled="record.id === 1">删除</a>
            </a-popconfirm>
          </template>
        </custom-table>
      </div>
    </split-layout>
  </page-view>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import AddUserModal from './components/AddUserModal';
  import EditUserModal from './components/EditUserModal';
  import ResetPasswordModal from './components/ResetPasswordModal';
  import ShowUserItemModal from './components/ShowUserItemModal';
  import CustomTable from '@/components/base/Table/CustomTable';
  import QueryForm from '@/components/base/QueryForm';
  const QueryFormItem = QueryForm.Item;

  export default {
    name: 'UserList',
    components: {
      AddUserModal,
      EditUserModal,
      ResetPasswordModal,
      ShowUserItemModal,
      CustomTable,
      QueryForm,
      QueryFormItem,
    },
    data() {
      return {
        userPage: [],
        columns: [
          {
            title: '账号',
            dataIndex: 'userName',
          },
          {
            title: '姓名',
            dataIndex: 'fullName',
          },
          {
            title: '手机号码',
            dataIndex: 'phone',
          },
          {
            title: '角色',
            dataIndex: 'roleName',
            scopedSlots: { customRender: 'roleName' },
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
        loadingUser: (state) => state.SysUser.loading,
      }),
    },
    methods: {
      ...mapActions({
        handlePage: 'SysUser/page',
        handleResetPassword: 'SysUser/resetPassword',
        handleRemove: 'SysUser/remove',
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
          this.userPage = res;
        });
      },
      onEdit(event, data) {
        event.stopPropagation();
        this.$refs.editUserModal.show(data);
      },
      onRemove(event, data) {
        event.stopPropagation();
        this.handleRemove({ ids: [data.id] }).then(() => {
          this.refreshTable();
          this.$message.success('删除用户成功');
        });
      },
      onShowUserItem(event, data) {
        event.stopPropagation();
        this.$refs.showUserItemModal.show([data.id]);
      },
      onResetPassword(event, data) {
        event.stopPropagation();
        this.$refs.resetPasswordModal.show([data.id]);
      },
      onBatchRemove() {
        const quest = (resolve) => {
          this.handleRemove({ ids: this.$refs.userTable.getSelectedRowKeys() })
            .then(() => {
              this.refreshTable();
              this.$message.success('删除用户成功');
            })
            .finally(resolve());
        };
        this.$confirm({
          title: '用户删除',
          content: '确定要删除选中的用户吗？',
          onOk() {
            return new Promise((resolve) => {
              quest(resolve);
            });
          },
        });
      },
      onBatchResetPassword() {
        this.$refs.resetPasswordModal.show(this.$refs.userTable.getSelectedRowKeys());
      },
    },
  };
</script>
