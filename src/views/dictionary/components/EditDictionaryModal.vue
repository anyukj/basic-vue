<template>
  <a-modal
    title="编辑字典"
    :visible="visible"
    @ok="onSubmit"
    @cancel="hide"
    :confirm-loading="loadingDictionary.update"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="字典名称">
        <a-input
          placeholder="请输入字典名称"
          v-decorator="['name', { rules: [{ required: true, message: '请输入字典名称' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
      <a-form-item label="字典代码">
        <a-input
          placeholder="请输入字典代码"
          v-decorator="['code', { rules: [{ required: true, message: '请输入字典代码' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
      <a-form-item label="字典值">
        <a-input
          placeholder="请输入字典值"
          v-decorator="['value', { rules: [{ required: true, message: '请输入字典值' }], validateTrigger: 'blur' }]"
        />
      </a-form-item>
      <a-form-item label="字典描述">
        <a-textarea placeholder="请输入字典描述" v-decorator="['description']" />
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number style="width: 100%" placeholder="请输入排序序号" v-decorator="['sort']" />
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
    name: 'EditDictionaryModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        id: 0,
      };
    },
    computed: {
      ...mapState({
        loadingDictionary: (state) => state.SysDictionary.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleUpdate: 'SysDictionary/update',
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
              this.$message.success('修改字典成功');
              this.hide();
            });
          }
        });
      },
    },
  };
</script>
