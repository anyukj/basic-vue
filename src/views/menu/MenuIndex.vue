<template>
  <page-view>
    <split-layout leftWidth="360px">
      <div slot="left" class="left">
        <search-tree ref="searchTreeMenu" :data="treeMenu" @selected="selectedMenu" />
      </div>
      <div>
        <menu-form :all-menu="treeMenu" :selectedKey="selectedKey" @ok="refreshMenuTree" />
      </div>
    </split-layout>
  </page-view>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import SearchTree from '@/components/base/SearchTree';
  import MenuForm from './components/MenuForm';

  export default {
    name: 'Index',
    components: { SearchTree, MenuForm },
    data() {
      return {
        allMenu: [],
        itemMenu: [],
        selectedKey: 0,
      };
    },
    created() {},
    mounted() {
      this.refreshMenuTree();
    },
    computed: {
      ...mapState({
        loadingMenu: (state) => state.SysMenu.loading,
      }),
      treeMenu: (vm) => {
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
            title: '首页',
            children: forMenu(vm.allMenu),
          },
        ];
      },
    },
    methods: {
      ...mapActions({
        handleAllMenu: 'SysMenu/allMenu',
      }),
      selectedMenu(key, title) {
        this.selectedKey = parseInt(key[0] || 0);
      },
      refreshMenuTree() {
        const expandedKeys = this.$refs.searchTreeMenu.getExpandKeys() || [0];
        this.handleAllMenu().then((res) => {
          this.allMenu = res;
          this.$refs.searchTreeMenu.setExpandKeys(expandedKeys);
        });
      },
    },
  };
</script>

<style scoped lang="less">
  .left {
    margin: 0 8px;
  }
</style>
