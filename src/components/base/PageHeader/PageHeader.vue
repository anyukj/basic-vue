<template>
  <div class="page-header">
    <div class="page-header-index-wide">
      <Breadcrumb />
      <div class="detail">
        <div class="main">
          <div class="row">
            <img v-if="logo" :src="logo" class="logo" />
            <h1 v-if="title" class="title">{{ title }}</h1>
            <div class="action">
              <slot name="action"></slot>
            </div>
          </div>
          <div class="row">
            <div v-if="avatar" class="avatar">
              <a-avatar :src="avatar" />
            </div>
            <div v-if="this.$slots.content" class="headerContent">
              <slot name="content"></slot>
            </div>
            <div v-if="this.$slots.extra" class="extra">
              <slot name="extra"></slot>
            </div>
          </div>
          <div v-if="this.$slots.pageMenu" class="pageMenu">
            <slot name="pageMenu"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/base/tools/Breadcrumb';

  export default {
    name: 'PageHeader',
    components: { Breadcrumb },
    props: {
      title: {
        type: [String, Boolean],
        default: true,
        required: false,
      },
      logo: {
        type: String,
        default: '',
        required: false,
      },
      avatar: {
        type: String,
        default: '',
        required: false,
      },
    },
  };
</script>

<style lang="less" scoped>
  .page-header {
    background: #fff;
    padding: 12px 24px 0;
    margin: -24px -24px 24px;
    border-bottom: 1px solid #e8e8e8;

    .breadcrumb {
      padding-bottom: 8px;
      margin: 0;
    }

    .detail {
      display: flex;

      .avatar {
        flex: 0 1 72px;
        margin: 0 24px 8px 0;

        & > span {
          border-radius: 72px;
          display: block;
          width: 72px;
          height: 72px;
        }
      }

      .main {
        width: 100%;
        flex: 0 1 auto;

        .row {
          display: flex;
          width: 100%;

          .avatar {
            margin-bottom: 16px;
          }
        }

        .title {
          display: block;
          float: left;
          margin-bottom: 0;
          padding-right: 12px;
          padding-bottom: 12px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          font-size: 20px;
          line-height: 32px;
        }
        .logo {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          margin-right: 16px;
        }
        .content,
        .headerContent {
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;

          .link {
            margin-top: 16px;
            line-height: 24px;

            a {
              font-size: 14px;
              margin-right: 32px;
            }
          }
        }
        .extra {
          padding-bottom: 12px;
          margin-left: auto;
          text-align: right;
          flex: 0 1 auto;
          min-width: 242px;
        }
        .action {
          margin-left: auto;
          text-align: right;
          min-width: 266px;
          flex: 0 1 auto;
          &:empty {
            display: none;
          }
        }
        .pageMenu {
          margin-top: 16px;
        }
      }
    }
  }
</style>
