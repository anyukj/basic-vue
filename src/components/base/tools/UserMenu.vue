<template>
  <div class="user-wrapper">
    <!-- 修改密码 -->
    <UpdatePasswordModal ref="updatePasswordModel" />
    <!-- 页面内容 -->
    <div class="content-box">
      <!-- router-link :to="{ name: 'Notification' }">
        <span class="action">
          <a-badge count="0">
            <a-icon style="font-size: 16px; padding: 4px;" type="bell" />
          </a-badge>
        </span>
      </router-link -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon style="font-size: 16px; padding: 4px" type="user" />
          <span>{{ userInfo.fullName }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- a-menu-item key="0">
            <router-link :to="{ name: 'UpdatePersonal' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item -->
          <a-menu-item key="1">
            <a href="javascript:;" @click="handleUpdatePassword">
              <a-icon type="setting" />
              <span>修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { setToken } from '@/utils/storageUtil';
  import UpdatePasswordModal from '@/components/business/user/UpdatePasswordModal';

  export default {
    name: 'UserMenu',
    components: { UpdatePasswordModal },
    computed: {
      ...mapState({
        userInfo: (state) => state.SysUser.userInfo,
      }),
    },
    methods: {
      handleUpdatePassword() {
        this.$refs.updatePasswordModel.show();
      },
      handleLogout() {
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk: () => {
            setToken(null);
            this.$router.push(`/user/login?redirect=${this.$route.path}`);
          },
          onCancel() {},
        });
      },
    },
  };
</script>
