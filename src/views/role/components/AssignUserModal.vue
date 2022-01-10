<template>
  <a-modal title="用户选择" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loadingRole.assignUsers">
    <custom-table
      ref="userTable"
      :showAlert="false"
      :showSelection="true"
      :loading="loadingUser.page || loadingRole.relationUsers"
      :columns="columns"
      :dataSource="userPage"
      @change="onTableChange"
    />
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import CustomTable from '@/components/base/Table/CustomTable';

  export default {
    name: 'AssignUserModal',
    components: { CustomTable },
    data() {
      return {
        visible: false,
        roleId: 0,
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
        ],
        filter: {
          form: { status: 0 },
          page: {},
        },
      };
    },
    computed: {
      ...mapState({
        loadingRole: (state) => state.SysRole.loading,
        loadingUser: (state) => state.SysUser.loading,
      }),
    },
    created() {
      this.refreshTable();
    },
    methods: {
      ...mapActions({
        handlePage: 'SysUser/page',
        handleAssignUsers: 'SysRole/assignUsers',
        handleRelationUsers: 'SysRole/relationUsers',
      }),
      onTableChange(pageFilter) {
        this.filter.page = pageFilter;
        this.refreshTable();
      },
      refreshTable() {
        this.handlePage({ ...this.filter.form, ...this.filter.page }).then((res) => {
          this.userPage = res;
        });
      },
      show(id) {
        this.roleId = id;
        this.handleRelationUsers({ roleId: id }).then((res) => {
          this.$refs.userTable.setSelectedRowKeys(res);
        });
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      onSubmit() {
        this.handleAssignUsers({ one: this.roleId, many: this.$refs.userTable.getSelectedRowKeys() }).then((res) => {
          this.$emit('ok', res);
          this.$message.success('分配用户成功');
          this.hide();
        });
      },
    },
  };
</script>
