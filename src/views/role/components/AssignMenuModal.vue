<template>
  <a-modal title="菜单选择" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loadingRole.assignMenus">
    <custom-table
      ref="menuTable"
      :showAlert="false"
      :showSelection="true"
      :loading="loadingMenu.allMenu || loadingRole.relationMenus"
      :columns="columns"
      :dataSource="allMenu"
      @change="onTableChange"
    />
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import CustomTable from '@/components/base/Table/CustomTable';

  export default {
    name: 'AssignMenuModal',
    components: { CustomTable },
    data() {
      return {
        visible: false,
        roleId: 0,
        allMenu: [],
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '路径',
            dataIndex: 'path',
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
        loadingMenu: (state) => state.SysMenu.loading,
      }),
    },
    created() {
      this.refreshTable();
    },
    methods: {
      ...mapActions({
        handleAllMenu: 'SysMenu/allMenu',
        handleAssignMenus: 'SysRole/assignMenus',
        handleRelationMenus: 'SysRole/relationMenus',
      }),
      onTableChange(pageFilter) {
        this.filter.page = pageFilter;
        this.refreshTable();
      },
      refreshTable() {
        this.handleAllMenu().then((res) => {
          this.allMenu = res;
        });
      },
      show(id) {
        this.roleId = id;
        this.handleRelationMenus({ roleId: id }).then((res) => {
          this.$refs.menuTable.setSelectedRowKeys(res);
        });
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      onSubmit() {
        this.handleAssignMenus({ one: this.roleId, many: this.$refs.menuTable.getSelectedRowKeys() }).then((res) => {
          this.$emit('ok', res);
          this.$message.success('分配用户成功');
          this.hide();
        });
      },
    },
  };
</script>
