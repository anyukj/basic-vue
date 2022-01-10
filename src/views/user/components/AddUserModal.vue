<template>
  <a-modal
    title="新增用户"
    :visible="visible"
    @ok="onSubmit"
    @cancel="hide"
    :confirm-loading="loadingUser.add || loadingFile.upload"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="账号">
        <a-input
          placeholder="请输入账号"
          v-decorator="['userName', { rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
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
      <a-form-item label="姓名">
        <a-input
          placeholder="请输入姓名"
          v-decorator="['fullName', { rules: [{ required: true, message: '请输入姓名' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input placeholder="请输入联系电话" v-decorator="['phone']" />
      </a-form-item>
      <a-form-item label="用户附件">
        <upload-file ref="userUpload" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import UploadFile from '@/components/business/file/UploadFile';

  export default {
    name: 'AddUserModal',
    components: { UploadFile },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
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
        handleAdd: 'SysUser/add',
      }),
      show() {
        this.form.resetFields();
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.userUpload.setFiles();
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
            this.$refs.userUpload.handleSubmit().then((files) => {
              this.handleAdd({ ...values, files }).then((res) => {
                this.$emit('ok', res);
                this.$message.success('新增用户成功');
                this.hide();
              });
            });
          }
        });
      },
    },
  };
</script>
