<template>
  <div>
    <!-- 页面头部信息 -->
    <PageHeader :title="pageTitle" :avatar="avatar" :logo="logo">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="description">
        <p class="description">{{ description }}</p>
      </div>
      <slot slot="extra" name="extra"></slot>
      <div slot="pageMenu" v-if="directTabs">
        <a-tabs :tabBarStyle="{ margin: 0 }" :activeKey="tabActiveKey" @change="tabChange">
          <a-tab-pane v-for="item in directTabs" :tab="item.title" :key="item.key"></a-tab-pane>
        </a-tabs>
      </div>
    </PageHeader>
    <!-- 主体内容 -->
    <div class="content">
      <slot>
        <router-view />
      </slot>
    </div>
  </div>
</template>

<script>
  import PageHeader from '@/components/base/PageHeader';
  export default {
    name: 'PageView',
    components: { PageHeader },
    props: {
      avatar: {
        type: String,
        default: null,
      },
      title: {
        type: [String, Boolean],
        default: true,
      },
      description: {
        type: String,
        default: null,
      },
      logo: {
        type: String,
        default: null,
      },
      directTabs: {
        type: Array,
        default: null,
      },
    },
    data() {
      return {
        pageTitle: null,
      };
    },
    mounted() {
      this.getPageMeta();
    },
    updated() {
      this.getPageMeta();
    },
    computed: {
      tabActiveKey: (vm) => {
        if (vm.directTabs) {
          const filterUrl = vm.directTabs.filter((item) => item.url === vm.$route.path)[0];
          if (filterUrl) {
            return filterUrl.key;
          } else {
            return '1';
          }
        }
      },
    },
    methods: {
      getPageMeta() {
        this.pageTitle = typeof this.title === 'string' || !this.title ? this.title : this.$route.meta.title;
      },
      tabChange(key) {
        const filterKey = this.directTabs.filter((item) => item.key === key)[0];
        if (filterKey) {
          this.$router.push(filterKey.url);
        }
      },
    },
  };
</script>

<style scoped lang="less">
  .description {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.65);
  }
</style>
