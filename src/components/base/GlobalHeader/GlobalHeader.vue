<template>
  <transition name="showHeader">
    <div class="header-animat">
      <a-layout-header
        :class="[
          fixedHeader && 'ant-header-fixedHeader',
          collapsed ? 'ant-header-side-closed' : 'ant-header-side-opened',
        ]"
        :style="{ padding: '0' }"
      >
        <div class="header">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
          <UserMenu />
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
  import UserMenu from '@/components/base/tools/UserMenu';
  export default {
    name: 'GlobalHeader',
    components: { UserMenu },
    props: {
      fixedHeader: {
        type: Boolean,
        required: false,
        default: true,
      },
      collapsed: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      toggle() {
        this.$emit('toggle');
      },
    },
  };
</script>

<style scoped lang="less"></style>
