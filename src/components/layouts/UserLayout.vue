<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="~@/assets/logo.svg" class="logo" alt="logo" />
          <span class="title">基础平台系统</span>
        </div>
        <div class="desc">用户登录</div>
      </div>

      <router-view />

      <div class="footer">
        <div class="copyright">
          <a href="http://beian.miit.gov.cn" target="_blank">琼ICP备2021009467号</a> &copy; 2021 Chao
        </div>
        <div class="copyright"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserLayout',
    data() {
      return {};
    },
  };
</script>

<style scoped lang="less">
  #userLayout.user-layout-wrapper {
    height: 100%;

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
