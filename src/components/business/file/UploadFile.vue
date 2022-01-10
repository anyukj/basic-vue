<template>
  <a-spin :spinning="loadingFile.upload || false">
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button> <a-icon type="upload" /> 文件上传 </a-button>
    </a-upload>
  </a-spin>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'UploadFile',
    data() {
      return {
        fileList: [],
      };
    },
    created() {},
    computed: {
      ...mapState({
        loadingFile: (state) => state.SysFile.loading,
      }),
    },
    methods: {
      ...mapActions({
        handleUpload: 'SysFile/upload',
      }),
      setFiles(files) {
        // 传入文件名称列表
        let fileList = [];
        (files || []).forEach((file, index) => {
          if (file instanceof String) {
            fileList.push({
              uid: 0 - index,
              name: file,
              status: 'done',
            });
          } else {
            fileList.push({
              uid: file.newName,
              name: file.originalName,
              status: 'done',
            });
          }
        });
        this.fileList = fileList;
      },
      handleSubmit() {
        const { fileList } = this;
        const oldNames = fileList.filter((file) => file.status === 'done').map((file) => file.uid);
        const postFiles = fileList.filter((file) => file instanceof File);

        return new Promise((resolve) => {
          if (postFiles.length === 0) {
            // 没有新文件的时候返回旧文件操作之后的文件信息
            this.$emit('ok', oldNames);
            resolve(oldNames);
            return;
          }
          this.handleUpload(postFiles).then((res) => {
            // 提交文件后合并旧文件
            const result = this._.concat(oldNames, res);
            this.$emit('ok', result);
            resolve(result);
          });
        });
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      },
      beforeUpload(file) {
        this.fileList = [...this.fileList, file];
        return false;
      },
    },
  };
</script>

<style scoped></style>
