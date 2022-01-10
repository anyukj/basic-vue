<template>
  <div class="main">
    <a-form class="user-layout-login" :form="form" @submit="onSubmit">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入账号"
          v-decorator="['userName', { rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'change' }]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          size="large"
          autocomplete="false"
          :maxLength="32"
          placeholder="请输入密码"
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
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox>自动登录</a-checkbox>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button block size="large" type="primary" htmlType="submit" class="login-button" :loading="loadingUser.login"
          >确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import router from '@/router';

  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        form: this.$form.createForm(this),
        redirect: this.$route.query.redirect,
      };
    },
    computed: {
      ...mapState({
        loadingUser: (state) => state.SysUser.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleLogin: 'SysUser/login',
      }),
      onSubmit(e) {
        e.preventDefault();
        const {
          form: { validateFields },
          $route,
        } = this;

        validateFields((err, values) => {
          if (!err) {
            this.handleLogin(values).then(() => {
              router.push(this.redirect || '/home');
            });
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped></style>
