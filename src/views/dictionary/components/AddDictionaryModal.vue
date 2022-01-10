<template>
  <a-modal title="新增字典" :visible="visible" @ok="onSubmit" @cancel="hide" :confirm-loading="loadingDictionary.add">
    <a-spin :spinning="loadingDictionary.all || false">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="父级字典">
          <a-tree-select
            style="width: 100%"
            :tree-data="treeDictionary"
            :tree-default-expanded-keys="[0]"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            v-decorator="['parentId', { initialValue: 0 }]"
          >
          </a-tree-select>
        </a-form-item>
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
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    name: 'AddDictionaryModal',
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        allDictionary: [],
      };
    },
    created() {
      this.handleList().then((res) => {
        this.allDictionary = res;
      });
    },
    computed: {
      ...mapState({
        loadingDictionary: (state) => state.SysDictionary.loading,
      }),
      treeDictionary: (vm) => {
        const forMenu = (menus) => {
          return menus.map((item) => {
            return {
              key: item.id,
              value: item.id,
              title: item.name,
              children: item.children && forMenu(item.children),
            };
          });
        };
        return [
          {
            key: 0,
            value: 0,
            title: '根节点',
            children: forMenu(vm.allDictionary),
          },
        ];
      },
    },
    methods: {
      ...mapActions({
        handleList: 'SysDictionary/page',
        handleAdd: 'SysDictionary/add',
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
              this.$message.success('新增字典成功');
              this.hide();
            });
          }
        });
      },
    },
  };
</script>
