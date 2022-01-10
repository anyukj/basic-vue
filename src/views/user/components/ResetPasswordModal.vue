<template>
  <a-modal
    title="重置密码"
    :visible="visible"
    @ok="onSubmit"
    @cancel="hide"
    :confirm-loading="loadingUser.resetPassword"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="密码">
        <a-input
          placeholder="请输入密码"
          :maxLength="32"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' },
                { min: 6, max: 32, message: '密码长度为6 - 32' },
              ],
              validateTrigger: 'blur',
            },
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ResetPasswordModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        ids: 0,
      };
    },
    computed: {
      ...mapState({
        loadingUser: (state) => state.SysUser.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleResetPassword: 'SysUser/resetPassword',
      }),
      show(ids) {
        this.ids = ids;
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
            this.handleResetPassword({ ...values, ids: this.ids }).then((res) => {
              this.$emit('ok', res);
              this.$message.success('重置密码成功');
              this.hide();
            });
          }
        });
      },
    },
  };
</script>
