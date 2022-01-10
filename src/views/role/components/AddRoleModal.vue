<template>
  <a-modal title="新增角色" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loading.add">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="角色名称">
        <a-input
          placeholder="请输入角色名称"
          v-decorator="['name', { rules: [{ required: true, message: '请输入角色名称' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
      <a-form-item label="角色描述">
        <a-textarea placeholder="请输入角色描述" v-decorator="['description']" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'AddRoleModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.SysRole.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleAdd: 'SysRole/add',
      }),
      show() {
        this.form.resetFields();
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      onSubmit() {
        const {
          form: { validateFields },
        } = this;

        validateFields((err, values) => {
          if (!err) {
            this.handleAdd(values).then((res) => {
              this.$emit('ok', res);
              this.$message.success('新增角色成功');
              this.hide();
            });
          }
        });
      },
    },
  };
</script>
