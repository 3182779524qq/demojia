<template>
  <ul class="cfj_group">
    <template v-for="(item,index) in folder">
      <li :class="folder.length-1===index?'last_li cfj_tree':'cfj_tree'" :key="index">
        <span @click="select(item)" :class="isActive(item.id)?'active cfj_leaf':'cfj_leaf'">
          <i v-if="item.children" class="my_icon" @click="item.show = !item.show">
            <i v-if="item.show" class="el-icon-minus"></i>
            <i v-else class="el-icon-plus"></i>
          </i>
          <i v-else class="my_icon"></i>
          {{ item.label }}
        </span>
        <el-collapse-transition>
          <DatabaseTree v-if="item.children && item.show" :folder="item.children" :selects="select"
            :currentId="currentId"></DatabaseTree>
        </el-collapse-transition>
      </li>
    </template>
  </ul>
</template>

<script>
  export default {
    name: "DatabaseTree",
    props: ["folder", "selects", "currentId"],
    data() {
      return {

      }
    },
    computed:{
      // isActive
    },
    mounted(){
      let arr = this.folder
      for (let i = 0; i < arr.length; i++) {

      }
    },
    methods: {
      isActive(id){
        return this.currentId.includes(id)
      },
      select(item){
        if(this.currentId.indexOf(item.id)>-1){
          this.currentId.splice(this.currentId.indexOf(item.id),1)
        }else{
          this.currentId.push(item.id)
        }
        this.$emit('selects',item)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .my_icon {
    display: block;
    border: 1px dashed #ccc;
    color: #ccc;
    line-height: 16px;
    text-align: center;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background: #ffffff;
    position: absolute;
    left: -20px;
    top: 12px;
    z-index: 3;
  }
  .cfj_tree{
    position: relative;

  }
  .cfj_leaf{
    position: relative;
    padding: 0 12px;
    line-height: 40px;
    height: 40px;
    display: block;

  }
  .cfj_group {
    line-height: 40px;

    ul {
      margin-left: 40px;
      line-height: 40px;

      li {
        position: relative;

        &:before {
          content: "";
          position: absolute;
          left: -50px;
          bottom: 20px;
          width: 1px;
          height: 100%;
          border-left: 1px dashed #ccc;
          z-index: 1;
        }

        span {
          position: relative;
          padding: 0 12px;
          display: inline-block;
          height: 100%;
          color: #ababab;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
          &:hover {
            background: #409EFF;
            color: #ffffff;
          }

          &:before {
            content: "";
            position: absolute;
            left: -50px;
            bottom: 18px;
            width: 40px;
            height: 40px;
            border-left: 1px dashed #ccc;
            border-bottom: 1px dashed #ccc;
            z-index: 1;
          }
        }
        .active {
          background: #409EFF;
          color: #ffffff;
        }
      }

      .last_li {
        &:before {
          content: "";
          position: absolute;
          left: -50px;
          bottom: 20px;
          width: 1px;
          height: 100%;
          border-left: 0px dashed #ccc;
          z-index: 1;
          span{
            &:before {
            content: "";
            position: absolute;
            left: -50px;
            bottom: 20px;
            width: 40px;
            height: 40px;
            border-left: 1px dashed #ccc;
            border-bottom: 1px dashed #ccc;
            z-index: 1;
          }
          }
        }
      }
    }
  }

</style>
