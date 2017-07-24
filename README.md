# easy-vue
The demo explan how the vue work.简单模拟vue
# I just wish we can learn some from this demo.Though it is very easy.
![image](https://github.com/atoanofish/easy-vue/blob/master/img/demo.png)
## Reactivity in Depth
### let us see the reactivity in depth:
When you pass a plain JavaScript object to a Vue instance as its data option, Vue will walk through all of its properties and convert them to getter/setters using Object.defineProperty. This is an ES5-only and un-shimmable feature, which is why Vue doesn’t support IE8 and below.
The getter/setters are invisible to the user, but under the hood they enable Vue to perform dependency-tracking and change-notification when properties are accessed or modified. One caveat is that browser consoles format getter/setters differently when converted data objects are logged, so you may want to install vue-devtools for a more inspection-friendly interface.
Every component instance has a corresponding watcher instance, which records any properties “touched” during the component’s render as dependencies. Later on when a dependency’s setter is triggered, it notifies the watcher, which in turn causes the component to re-render.
==================================================
### 深入响应式原理 （官网解释）
  把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。
用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 vue-devtools 来获取更加友好的检查接口。
每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
![image](https://github.com/atoanofish/easy-vue/blob/master/img/work.png)
## We can understand that
![image](https://github.com/atoanofish/easy-vue/blob/master/img/work1.png)

### Now if we want to do a vue.js ,we must do that:
* 1, The implementation of a data listener Observer, can be all attributes of the data object to monitor, if changes, you can get the > latest value and notify the subscriber
* 2, The implementation of an instruction parser Compile, the instructions for each element node scanning and parsing, according to the instruction template to replace data, as well as binding the corresponding update function.(just done v-model and v-text)
* 3, The implementation of a Watcher, as a bridge to connect Observer and Compile, can subscribe and receive notification of each property changes, the implementation of the command binding corresponding callback function, so as to update the view
* 4, The Vue entry function
===============================================================================
* 1、数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
* 2、指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数(该demo 只做了v-text 和 v-model)
* 3、Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
* 4、VUE入口函数

