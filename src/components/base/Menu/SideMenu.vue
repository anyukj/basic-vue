<template>
  <a-layout-sider
    :class="['sider', 'shadow', theme, fixSidebar ? 'ant-fixed-sidemenu' : null]"
    width="256px"
    v-model="collapsed"
    :trigger="null"
  >
    <logo />
    <s-menu :collapsed="collapsed" :menu="userTreeMenu" :theme="theme" style="padding: 16px 0" />
  </a-layout-sider>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from '@/components/base/tools/Logo';
  import SMenu from './index';

  export default {
    name: 'SideMenu',
    components: { Logo, SMenu },
    props: {
      theme: {
        type: String,
        required: false,
        default: 'dark',
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false,
      },
      fixSidebar: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      ...mapGetters({
        userTreeMenu: 'SysMenu/userTreeMenu',
      }),
      localMenus() {
        return this.$router.options.routes[1].children;
      },
    },
    methods: {},
    created() {},
  };
</script>

<style scoped lang="less"></style>
