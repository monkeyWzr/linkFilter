<script>
    //es6
    export default {
        el:"#msg",
         //data:function(){}，下面是es6写法
         data: {
              allLinks: [],
              visibleLinks: [],
              filterText: ''
        },
        mounted: function () {
          this.visibleLinks = this.allLinks;
        },
        methods: {
          toggleAll: function () {
            var checked = document.getElementById('toggle_all').checked;
            for (var i = 0; i < this.visibleLinks.length; ++i) {
              document.getElementById('check' + i).checked = checked;
            }
          },
          downloadCheckedLinks: function () {
            for (var i = 0; i < this.visibleLinks.length; ++i) {
              if (document.getElementById('check' + i).checked) {
                chrome.downloads.download({url: this.visibleLinks[i]},
                                                       function(id) {
                });
              }
            }
          }
        },
        watch: {
          filterText: function() {
            this.visibleLinks = this.allLinks.filter(function(value) {
              console.log(value);
              var re = new RegExp(this);
              return value.toString().match(re);
            }, this.filterText);
          }
        }
    }
</script>
<template>
  <div id="msg">
    <input type="text" v-model="filterText">
    <button type="button" @click="downloadCheckedLinks">下载</button>
    <p>
      <input type="checkbox" id="toggle_all" @click="toggleAll">全选
    </p>
    <table>
      <tr v-for="(link, index) in visibleLinks">
        <th><input type="checkbox" v-bind:id="'check' + index"></th>
        <th align=left>{{ link }}</th>
      </tr>
    </table>
    <!-- <mt-checklist title="复选框列表" v-model="visibleLinks" :options="visibleLinks"></mt-checklist> -->
  </div>
</template>
<style lang="sass">
    /*一定要加lang不然无法编译*/
    /*测试一下对sass的编译*/
    $qwe:#fff;
    body{
        background-color: $qwe;
        h1{
            background-color: #eee;
            color: red;
            transform: translate(10%, 10%);/*测试自动添加前缀*/
        }
        h1:hover{
            height:100px;
        }
        h2{
            background-color: #999;
        }
    }
</style>
