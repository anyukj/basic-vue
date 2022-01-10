<template>
  <a-modal
    title="修改密码"
    :visible="visible"
    @ok="okHandler"
    @cancel="hide"
    :confirm-loading="loadingUser.updatePassword"
  >
    <a-form :form="form" :labelCol="{ span: 5 }" :wrapperCol="{ span: 19 }">
      <a-form-item label="旧密码">
        <a-input-password
          class="inputPassword"
          autocomplete="false"
          :maxLength="32"
          placeholder="请输入旧密码"
          v-decorator="[
            'oldPassword',
            {
              rules: [
                { required: true, message: '请输入旧密码' },
                { min: 6, max: 32, message: '密码长度为6 - 32' },
              ],
            },
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>
      <a-form-item label="新密码">
        <a-input-password
          class="inputPassword"
          autocomplete="false"
          :maxLength="32"
          placeholder="请输入新密码"
          v-decorator="[
            'newPassword',
            {
              rules: [
                { required: true, message: '请输入确认新密码' },
                { min: 6, max: 32, message: '密码长度为6 - 32' },
              ],
              validateTrigger: 'blur',
            },
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>
      <a-form-item label="确认新密码">
        <a-input-password
          class="inputPassword"
          autocomplete="false"
          :maxLength="32"
          placeholder="请输入确认新密码"
          v-decorator="[
            'newPassword1',
            {
              rules: [
                { required: true, message: '请输入确认新密码' },
                { min: 6, max: 32, message: '密码长度为6 - 32' },
              ],
              validateTrigger: 'blur',
            },
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'UpdatePasswordModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
      };
    },
    computed: {
      ...mapState({
        loadingUser: (state) => state.SysUser.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleUpdatePassword: 'SysUser/updatePassword',
      }),
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      okHandler() {
        const {
          form: { validateFields },
        } = this;

        validateFields((err, values) => {
          if (!err) {
            if (values.newPassword !== values.newPassword1) {
              this.$message.error('新密码和确认密码不匹配');
            } else {
              this.handleUpdatePassword(values).then(() => {
                this.$message.success('修改密码成功');
                this.hide();
              });
            }
          }
        });
      },
    },
  };
</script>
