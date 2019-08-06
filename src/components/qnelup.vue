<template>
<!-- 七牛云+element上传图片 -->
  <div class="elup">
    <div class="avator_img">
      <img v-if="imgUrl" :src="imgUrl" class="avatar">
      <!-- <img v-else src="./../../assets/img/avatar.png" alt=""> -->
    </div>
    <!-- <el-upload class="avatar_text" :action="uploadUrl"
        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <div class="up_text">点击上传</div>
    </el-upload> -->

    <el-upload class="avatar_text"
      :limit='1' :action="uploadUrl" accept="image/jpeg,image/gif,image/png,image/bmp" list-type="picture-card"
      :data='uploadData' :on-success="handleAvatarSuccess" :on-error="uploadError" :before-upload="beforeAvatarUpload">
      <!-- <i class="el-icon-plus"></i> -->
      <div class="up_text">点击上传</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props:['inUrl'],
    data() {
      return {
        fileList:[],
        uploadUrl: 'https://upload-z2.qiniup.com',//  七牛上传地址
        uploadData: {
          key: '',
          token: ''
        },
        formAdd: {
          brandLogo: ''
        },
        imgKey:'',
        imgUrl:'',
        QiniuHost:''
      }
    },
    created(){
      this.imgUrl = this.inUrl||'';
      this.imgKey = this.inUrl||'';
    },
    mounted() {
      //  获取七牛云token
      this.$axios.ajax({
          method: "get",
          url: this.$url.getQiniuToken
        }).then((res) => {
          if (res.code === '0') {
            this.uploadData.token = res.data
          }
        }).catch((error) => {
          console.log(error);
        })
        this.$axios.ajax({
          method: "get",
          url: this.$url.getQiniuHost
        }).then((res) => {
          if (res.code == '0') {
            this.QiniuHost = res.data
          }
        }).catch((error) => {
          console.log(error);
        })
    },
    methods: {
      doDeleteImg(file, fileList) {
        // console.log('删除成功', file, fileList)
        let logoAry;
        let key;
        if (this.editState) {
          logoAry = this.mainInfo.brandLogo.split('/');
        } else {
          logoAry = this.formAdd.brandLogo.split('/');
        }
        key = logoAry[logoAry.length - 1];
        deleteQiniuImg({
          key
        }).then(res => {
          if (res.code === '0') {
            if (this.editState) {
              this.mainInfo.brandLogo = '';
            } else {
              this.formAdd.brandLogo = '';
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      doLookImg() {
        this.uploadDialogVisible = true;
        this.uploadDialogImg = this.editState ? this.mainInfo.brandLogo : this.formAdd.brandLogo;
      },
      handleAvatarSuccess(res, file, fileList) {
        // console.log('上传成功', res, file, fileList)
        let hash = res.hash;
        let key = res.key;
        this.imgKey = this.QiniuHost + '/' + res.key
        this.imgUrl = file.url
        // console.log(this.imgKey,'==================')
        // if (this.editState) {
        //   this.mainInfo.brandLogo = qiniuConfig.qiniuPath + '/' + key;
        // } else {
        //   this.formAdd.brandLogo = qiniuConfig.qiniuPath + '/' + key;
        // }
      },
      beforeAvatarUpload(file) {
        // console.log(file, 'beforeAvatarUpload')
        // var observable = qiniu.upload(file, key, token, putExtra, config)
        const isPNG = file.type === "image/png";
        const isJPEG = file.type === "image/jpeg";
        const isJPG = file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG && !isJPEG && !isJPG) {
          this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
          return false;
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
          return false;
        }
        this.uploadData.key = `upload_pic_${new Date().getTime()}_${file.name}`;
      },
      uploadError(err, file, fileList) {
        this.$message({
          message: "上传出错，请重试！",
          type: "error",
          center: true
        });
      },
    }
  }
</script>
<style>
.avator_img img{
  width: 72px;
      height: 72px;
  border-radius: 50%;
  overflow: hidden;
}
.my_avatar_uploader{
  height: 19px;
  width: 100px;
}
.elup .avatar-uploader .el-upload {
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .elup .avatar_text .el-upload {
    border: 0;
    border-radius: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #292c41;
  }
  .elup .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .elup .avatar-uploader .el-upload--text{
      width: 72px;
      height: 72px;
  }
  .elup .avatar_text .el-upload--text{
      width: 72px;
      height: 24px;
  }
  .el-upload-list {
    display: none;
  }
  .el-upload--picture-card{
    width: 72px;
    height: 24px;
    line-height: 24px;
  }
  .up_text{
    width: 72px;
    height: 24px;
    color: #00B77E;
  }
</style>
