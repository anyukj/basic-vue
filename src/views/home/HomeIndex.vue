<template>
  <div>
    <a-row type="flex" align="top" :gutter="[24, 16]">
      <a-col span="24" :lg="8" :xl="8">
        <a-card :bordered="false" title="系统参数">
          <template #extra>
            <a-button type="link" @click="refresh"> {{ refreshInterval ? '暂时自动刷新' : '开启自动刷新' }}</a-button>
          </template>
          <div>系统CPU数量：{{ metrics.cpuCount }}</div>
          <div>系统CPU使用率 ：{{ Math.round(metrics.cpuUsage * 10000) / 100 }}%</div>
        </a-card>
      </a-col>
      <a-col span="24" :lg="8" :xl="8">
        <a-card :bordered="false" title="应用">
          <div>应用CPU使用率：{{ Math.round(metrics.processCpuUsage * 10000) / 100 }}%</div>
          <div>应用启动时间：{{ moment(metrics.processStart * 1000).format('yyyy-MM-DD HH:mm:ss') }}</div>
          <div>应用运行时间 ：{{ secondToDate(Number.parseInt(metrics.processUptime)) }}</div>
        </a-card>
      </a-col>
      <a-col span="24" :lg="8" :xl="8">
        <a-card :bordered="false" title="JVM">
          <div>GC次数 ：{{ metrics.jvmGcCount }}</div>
          <div>最大内存：{{ Number.parseInt(metrics.jvmMemoryMax / 1000000) }}MB</div>
          <div>可用内存 ：{{ Number.parseInt(metrics.jvmMemoryCommitted / 1000000) }}MB</div>
          <div>已用内存：{{ Number.parseInt(metrics.jvmMemoryUsed / 1000000) }}MB</div>
        </a-card>
      </a-col>
      <a-col span="24" :lg="16" :xl="24">
        <a-card :bordered="false" title="预留"> 暂无数据 </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { getMetrics } from '@/api/Actuator.js';
  export default {
    name: 'Index',
    components: {},
    data() {
      return {
        refreshInterval: null,
        metrics: [],
      };
    },
    computed: {
      processCpuUsage() {
        new RegExp(/^process_cpu_usage (\d+\.\d+)/gm).test(this.prometheus);
        const value = RegExp.$1;
        return Math.floor(value * 10000) / 100;
      },
      systemCpuCount() {
        new RegExp(/^system_cpu_count (\d+)/gm).test(this.prometheus);
        return RegExp.$1;
      },
      systemCpuUsage() {
        new RegExp(/^system.cpu.usage (\d+\.\d+)/gm).test(this.prometheus);
        const value = RegExp.$1;
        return Math.floor(value * 10000) / 100;
      },
    },
    created() {
      this.startRefresh();
    },
    beforeDestroy() {
      this.stopRefresh();
    },
    methods: {
      refresh() {
        if (this.refreshInterval) {
          this.stopRefresh();
        } else {
          this.startRefresh();
        }
      },
      startRefresh() {
        this.refreshAll();
        this.refreshInterval = setInterval(() => {
          this.refreshAll();
        }, 5000);
      },
      stopRefresh() {
        if (this.refreshInterval) {
          clearInterval(this.refreshInterval);
          this.refreshInterval = null;
        }
      },
      refreshAll() {
        this.refreshSystemMetrics();
        this.refreshJVM();
      },
      refreshSystemMetrics() {
        this.handleMetrics('cpuCount', 'system.cpu.count');
        this.handleMetrics('cpuUsage', 'system.cpu.usage');
        this.handleMetrics('processStart', 'process.start.time');
        this.handleMetrics('processUptime', 'process.uptime');
        this.handleMetrics('processCpuUsage', 'process.cpu.usage');
      },
      refreshJVM() {
        this.handleMetrics('jvmGcCount', 'jvm.gc.pause');
        this.handleMetrics('jvmMemoryMax', 'jvm.memory.max');
        this.handleMetrics('jvmMemoryCommitted', 'jvm.memory.committed');
        this.handleMetrics('jvmMemoryUsed', 'jvm.memory.used');
      },
      handleMetrics(key, path) {
        getMetrics(path).then((res) => {
          this.$set(this.metrics, key, res.measurements[0].value);
        });
      },
      prometheusRegexp(regExp) {
        new RegExp(regExp).test(this.prometheus);
        return RegExp.$1;
      },
      secondToDate(msd) {
        let time = msd;
        if (null != time && '' != time) {
          if (time > 60 && time < 60 * 60) {
            time =
              parseInt(time / 60.0) + '分钟' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + '秒';
          } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time =
              parseInt(time / 3600.0) +
              '小时' +
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
              '分钟' +
              parseInt(
                (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                  parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
                  60,
              ) +
              '秒';
          } else if (time >= 60 * 60 * 24) {
            time =
              parseInt(time / 3600.0 / 24) +
              '天' +
              parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24) +
              '小时' +
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
              '分钟' +
              parseInt(
                (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                  parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
                  60,
              ) +
              '秒';
          } else {
            time = parseInt(time) + '秒';
          }
        }
        return time;
      },
    },
  };
</script>

<style lang="less" scoped></style>
