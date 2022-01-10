<template>
  <div>
    <a-input-search style="margin-bottom: 8px" placeholder="搜索" @change="onChange" />
    <a-tree
      @expand="onExpand"
      @select="onSelect"
      :selectedKeys="selectedKeys"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :treeData="treeData"
    >
      <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
  export default {
    name: 'SearchTree',
    props: {
      data: {
        type: Array,
        require: true,
      },
    },
    data() {
      return {
        searchValue: '',
        expandedKeys: [0],
        autoExpandParent: true,
        dataList: [],
        treeData: [],
        selectedKeys: [],
        selectedTitles: [],
      };
    },
    watch: {
      data: {
        handler(val) {
          this.dataList = [];
          this.generateList(val);
          this.treeData = val;
          this.expandedKeys = [0];
        },
        immediate: true,
      },
    },
    methods: {
      getSelectedKey() {
        return this.selectedKeys[0] || '';
      },
      getSelectedKeys() {
        return this.selectedKeys;
      },
      getSelectedTitle() {
        return this.selectedTitles[0] || '';
      },
      getSelectedTitles() {
        return this.selectedTitles;
      },
      getExpandKeys() {
        return this.expandedKeys;
      },
      setExpandKeys(keys) {
        this.expandedKeys = keys;
      },
      onSelect(selectedKeys, info) {
        if (info.selected) {
          this.selectedKeys = selectedKeys;
          this.selectedTitles = info.selectedNodes.map((i) => i.data.props.dataRef.title);
        }
        this.$emit('selected', this.selectedKeys, this.selectedTitles);
      },
      onExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      generateList(data) {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          if (node.scopedSlots === undefined) {
            node.scopedSlots = { title: 'title' };
          }
          this.dataList.push({ key: node.key, title: node.title });
          if (node.children) {
            this.generateList(node.children);
          }
        }
      },
      getParentKey(key, tree) {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i];
          if (node.children) {
            if (node.children.some((item) => item.title === key)) {
              parentKey = node.key;
            } else if (this.getParentKey(key, node.children)) {
              parentKey = this.getParentKey(key, node.children);
            }
          }
        }
        return parentKey;
      },
      onChange(e) {
        const value = e.target.value;
        const expandedKeys =
          value === ''
            ? [0]
            : this.dataList
                .map((item) => {
                  if (item.title.indexOf(value) > -1) {
                    return this.getParentKey(item.title, this.treeData);
                  }
                  return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      },
    },
  };
</script>

<style scoped lang="less"></style>
