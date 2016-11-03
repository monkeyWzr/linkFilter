//es6语法：
import Vue from "vue";//其实不用写完，会自动查找。可以直接写import Vue from "vue";
import Mint from 'mint-ui';
import { Checklist,Switch,Radio } from 'mint-ui';
import 'mint-ui/lib/style.css';
//外部引入别的库都可以用这样的方式，比如jquery等。。
//引入我们编写的测试用vue文件。
import app from './components/app';
Vue.config.debug = true;//开启错误提示
Vue.use(Mint);
Vue.component(Checklist.name, Checklist);
Vue.component(Switch.name, Switch);
Vue.component(Radio.name, Radio);

var allLinks = [];
chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
  }

  var vm = new Vue(app);

  vm.allLinks = allLinks;
  vm.visibleLinks = allLinks;

  // console.log(vm.allLinks);
  // allLinks.sort();
  // visibleLinks = allLinks;
  // console.log(allLinks);
  // showLinks();
});
