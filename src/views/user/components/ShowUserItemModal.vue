<template>
  <a-modal title="用户详情" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loadingUser.userItem">
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="姓名">
        {{ userItem.fullName }}
      </a-form-item>
      <a-form-item label="联系电话">
        {{ userItem.phone }}
      </a-form-item>
      <a-form-item label="用户附件">
        <a-list bordered :data-source="userItem.files">
          <a-list-item slot="renderItem" slot-scope="file">
            <a :href="`/api/file/${file.newName}`" :download="`${file.originalName}`">{{ file.originalName }}</a>
          </a-list-item>
        </a-list>
      </a-form-item>
      <a-form-item label="状态">
        <a-badge :status="userItem.status === 0 ? 'success' : 'error'" />
        {{ userItem.status === 0 ? '启用' : '停用' }}
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ShowUserItemModal',
    data() {
      return {
        visible: false,
        userItem: {},
        id: 0,
      };
    },
    computed: {
      ...mapState({
        loadingUser: (state) => state.SysUser.loading,
        loadingFile: (state) => state.SysFile.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleItem: 'SysUser/item',
      }),
      show(id) {
        this.id = id;
        this.visible = true;
        this.handleItem(id).then((res) => {
          this.userItem = res;
        });
      },
      hide() {
        this.visible = false;
      },
      onSubmit() {
        this.hide();
      },
    },
  };
</script>
