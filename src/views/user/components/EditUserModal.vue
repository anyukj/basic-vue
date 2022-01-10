<template>
  <a-modal
    title="编辑用户"
    :visible="visible"
    @ok="onSubmit"
    @cancel="hide"
    :confirm-loading="loadingUser.item || loadingUser.update || loadingFile.upload"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
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
  import UploadFile from '@/components/business/file/UploadFile';

  export default {
    name: 'EditUserModal',
    components: { UploadFile },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
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
        handleUpdate: 'SysUser/update',
        handleItem: 'SysUser/item',
      }),
      show(data) {
        this.id = data.id;
        this.visible = true;
        this.handleItem(data.id).then((res) => {
          const values = this.form.getFieldsValue();
          Object.keys(values).forEach((key) => {
            values[key] = res[key];
          });
          this.form.setFieldsValue(values);
          // 初始化文件上传
          this.$refs.userUpload.setFiles(res.files);
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
              this.handleUpdate({ ...values, id: this.id, files }).then((res) => {
                this.$emit('ok', res);
                this.$message.success('修改用户成功');
                this.hide();
              });
            });
          }
        });
      },
    },
  };
</script>
