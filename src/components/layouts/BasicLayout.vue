<template>
  <a-layout class="layout">
    <!-- 左侧功能菜单区域 -->
    <side-menu :collapsed="collapsed" :fixSidebar="fixSidebar" :theme="theme" />
    <!-- 右侧展示区域 -->
    <a-layout class="sidemenu" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- 顶部内容 -->
      <GlobalHeader :collapsed="collapsed" :fixedHeader="fixedHeader" @toggle="toggle" />
      <!-- 主要内容区 -->
      <a-layout-content :style="{ height: '100%', paddingTop: fixedHeader ? '64px' : '0' }">
        <!-- 主体内容 -->
        <div class="content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import config from '@/config/defaultSettings';
  import GlobalHeader from '@/components/base/GlobalHeader';
  import SideMenu from '@/components/base/Menu/SideMenu';

  export default {
    name: 'BasicLayout',
    components: { GlobalHeader, SideMenu },
    data() {
      return {
        collapsed: false,
        fixSidebar: config.fixSidebar,
        fixedHeader: config.fixedHeader,
        theme: config.navTheme,
        refreshTokenTimer: null,
      };
    },
    computed: {
      contentPaddingLeft() {
        if (!this.fixSidebar) {
          return '0';
        }
        if (!this.collapsed) {
          return '256px';
        }
        return '80px';
      },
    },
    created() {
      // 获取当前用户信息
      this.handleCurrentUser();
      // 获取菜单当前用户菜单信息
      this.handleUserMenu();
      // 定时刷新token---20分钟=1000*60*20=1200000
      this.handleRefreshToken();
      this.refreshTokenTimer = window.setInterval(() => {
        this.handleRefreshToken();
      }, 1200000);
    },
    beforeDestroy() {
      if (this.refreshTokenTimer) {
        window.clearInterval(this.refreshTokenTimer);
      }
    },
    methods: {
      ...mapActions({
        handleResetAllState: 'resetAllState',
        handleRefreshToken: 'SysUser/refreshToken',
        handleCurrentUser: 'SysUser/currentUser',
        handleUserMenu: 'SysMenu/userMenu',
      }),
      toggle() {
        this.collapsed = !this.collapsed;
      },
    },
  };
</script>

<style scoped lang="less">
  .content {
    margin: 24px;

    .link {
      margin-top: 16px;

      &:not(:empty) {
        margin-bottom: 16px;
      }

      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;

        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }

        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
