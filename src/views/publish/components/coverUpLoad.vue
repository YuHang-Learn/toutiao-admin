<template>
  <div class="avatar-cover">
    <i class="el-icon-plus symbol"></i>
    <img alt="" class="image">
  </div>
</template>

<script>
export default {
  name: 'coverUpLoad',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">

.avatar-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px dashed #000;
  margin-bottom: 1px;
  .symbol {
    font-size: 30px;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
