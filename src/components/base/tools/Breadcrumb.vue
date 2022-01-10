<template>
  <a-breadcrumb v-if="isShow" class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <router-link v-if="item.name != name && index != 0" :to="{ path: item.path === '' ? '/' : item.path }">
        {{ item.meta.title }}
      </router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        breadList: [],
      };
    },
    created() {
      this.getBreadcrumb();
    },
    computed: {
      isShow() {
        return this.breadList.length > 0;
      },
    },
    methods: {
      getBreadcrumb() {
        this.breadList = [];
        this.name = this.$route.name;
        if (this.$route.matched.length > 2) {
          for (let i = 1; i < this.$route.matched.length; i++) {
            this.breadList.push(this.$route.matched[i]);
          }
        }
      },
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      },
    },
  };
</script>

<style scoped></style>
