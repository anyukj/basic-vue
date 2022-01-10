<template>
  <div class="footer">
    <div class="links">
      <router-link :to="{ name: '/' }">联系客服</router-link>
      <router-link :to="{ name: '/' }">使用帮助</router-link>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2020 <span>xxx</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GlobalFooter',
    data() {
      return {};
    },
  };
</script>

<style scoped lang="less">
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, 0.45);

        &:hover {
          color: rgba(0, 0, 0, 0.65);
        }

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
</style>
