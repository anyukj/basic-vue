<template>
  <a-modal title="编辑角色" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loading.update">
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
      <a-form-item label="状态">
        <a-radio-group v-decorator="['status']">
          <a-radio :value="0">启用</a-radio>
          <a-radio :value="1">停用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'EditRoleModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        id: 0,
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.SysRole.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleUpdate: 'SysRole/update',
      }),
      show(data) {
        this.id = data.id;
        this.visible = true;
        this.$nextTick(() => {
          const values = this.form.getFieldsValue();
          Object.keys(values).forEach((key) => {
            values[key] = data[key];
          });
          this.form.setFieldsValue(values);
        });
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
            this.handleUpdate({ ...values, id: this.id }).then((res) => {
              this.$emit('ok', res);
              this.$message.success('修改角色成功');
              this.hide();
            });
          }
        });
      },
    },
  };
</script>
