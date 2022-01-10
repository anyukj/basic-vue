<template>
  <PageView :directTabs="tabs">
    <keep-alive>
      <router-view />
    </keep-alive>
  </PageView>
</template>

<script>
  export default {
    name: 'Data',
    components: {},
    data() {
      return {
        tabs: [
          {
            key: '1',
            title: '消息通知',
            url: '/notification/notice',
          },
          {
            key: '2',
            title: '个人消息',
            url: '/notification/message',
          },
        ],
      };
    },
  };
</script>
