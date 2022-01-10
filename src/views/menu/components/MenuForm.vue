<template>
  <div>
    <!-- 图标选择弹窗 -->
    <icon-select-modal ref="iconSelectModal" @ok="onSelectIcon" />
    <!-- 内容区 -->
    <div class="tool-bar">
      <!-- 新增按钮 -->
      <a-popconfirm title="确定新增表单内容吗？" ok-text="确定" cancel-text="取消" @confirm="onAdd">
        <a-button type="primary" :loading="loadingMenu.add"> 新增 </a-button>
      </a-popconfirm>
      <!-- 修改按钮 -->
      <a-popconfirm
        title="确定修改表单内容吗？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="onUpdate"
        :disabled="operationDisabled"
      >
        <a-button type="primary" :loading="loadingMenu.update" :disabled="operationDisabled"> 修改 </a-button>
      </a-popconfirm>
      <!-- 删除按钮 -->
      <a-popconfirm
        title="确定要删除菜单吗？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="onRemove"
        :disabled="operationDisabled"
      >
        <a-button type="primary" :loading="loadingMenu.remove" :disabled="operationDisabled"> 删除 </a-button>
      </a-popconfirm>
    </div>
    <a-spin :spinning="loadingMenu.item || false">
      <a-form :form="formMenu" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-form-item label="父级菜单">
          <a-tree-select
            style="width: 100%"
            :tree-data="allMenu"
            tree-default-expand-all
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            v-decorator="[
              'parentId',
              {
                rules: [{ required: true, message: '请选择父级菜单' }],
              },
            ]"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="名称">
          <a-input
            placeholder="请输入菜单名称"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入菜单名称' }],
                validateTrigger: 'blur',
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="路径">
          <a-input
            placeholder="请输入菜单路径"
            v-decorator="[
              'path',
              {
                rules: [{ required: true, message: '请输入菜单路径' }],
                validateTrigger: 'blur',
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="图标">
          <a-input-search placeholder="请输入菜单图标" v-decorator="['icon']" @search="onSelectIconShow">
            <a-button slot="enterButton"> 选择图标 </a-button>
          </a-input-search>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number style="width: 100%" placeholder="请输入排序" v-decorator="['sort', { initialValue: 0 }]">
          </a-input-number>
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-decorator="['status', { initialValue: 0 }]">
            <a-radio :value="0">启用</a-radio>
            <a-radio :value="1">停用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import { IconSelectModal } from '@/components/base/IconSelector';

  export default {
    name: 'MenuForm',
    components: { IconSelectModal },
    props: {
      selectedKey: {
        type: Number,
        required: false,
        default: 0,
      },
      allMenu: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        id: 0,
        formMenu: this.$form.createForm(this),
      };
    },
    watch: {
      selectedKey(val) {
        this.id = val;
        this.refreshForm();
      },
    },
    computed: {
      ...mapState({
        loadingMenu: (state) => state.SysMenu.loading,
      }),
      operationDisabled() {
        return this.id === 0;
      },
    },
    methods: {
      ...mapActions({
        handleItem: 'SysMenu/item',
        handleAdd: 'SysMenu/add',
        handleUpdate: 'SysMenu/update',
        handleRemove: 'SysMenu/remove',
      }),
      onSelectIconShow() {
        const icon = this.formMenu.getFieldValue('icon');
        this.$refs.iconSelectModal.show(icon);
      },
      onSelectIcon(icon) {
        this.formMenu.setFieldsValue({
          icon,
        });
      },
      refreshForm() {
        this.handleItem(this.id).then((res) => {
          const { id, ...data } = res;
          this.formMenu.resetFields();
          const values = this.formMenu.getFieldsValue();
          Object.keys(values).forEach((key) => {
            values[key] = data[key];
          });
          this.formMenu.setFieldsValue(values);
        });
      },
      onAdd() {
        const {
          formMenu: { validateFields },
        } = this;

        validateFields((err, values) => {
          if (!err) {
            this.handleAdd({ ...values }).then(() => {
              this.$emit('ok');
              this.$message.success('新增菜单成功');
            });
          }
        });
      },
      onUpdate() {
        const {
          itemMenu,
          formMenu: { validateFields },
        } = this;

        validateFields((err, values) => {
          if (!err) {
            this.handleUpdate({ ...itemMenu, ...values }).then(() => {
              this.$emit('ok');
              this.$message.success('修改菜单成功');
            });
          }
        });
      },
      onRemove() {
        this.handleRemove({ ids: [this.selectedKey] }).then(() => {
          this.$emit('ok');
          this.id = 0;
          this.$message.success('删除菜单成功');
        });
      },
    },
  };
</script>

<style scoped lang="less"></style>
