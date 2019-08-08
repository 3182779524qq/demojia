###vue前端开发规范统一开发环境
Intellij Idea,webstrome, sublime3,node最新稳定版，淘宝镜像

###技术框架选型
前端框架：vue
css预编译 ：stylus、less
css初始化：css-common
代码版本控制：git
屏幕适配布局：rem

###路由命名

采用带问号的history路由路径方式命名
路由及参数名称采用首字母小写的驼峰法命名
比如：http://www.test.com/ test? name =abc&testId=124
###views 命名
views 文件夹下面是由 以页面为单位的 vue 文件 或者 模块文件夹 组成的，放在 src 目录之下，与 components、assets 同级。
views 下的文件夹命名
views 下面的文件夹代表着模块的名字


由名词组成（car、order、cart）
单词只能有一个（good: car order cart）（bad: carInfo carpage）
尽量是名词（good: car）（bad: greet good）
以小写开头（good: car）（bad: Car）
views 下的 vue 文件命名
views 下面的 vue 文件代表着页面的名字
放在模块文件夹之下
只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home
尽量是名词
大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）
名字至少两个单词（good: CarDetail）（bad: Car）
常用结尾单词有（Detail、Edit、List、Info、Report）
以 Item 结尾的代表着组件（CarListItem、CarInfoItem）
components下的vue文件命名
components文件夹存放的是可复用公共组件
放在模块文件夹之下,文件夹命名同模块命名，小写字母开头，如common
大写字母开头，如common/Footer、common/Header
vue 方法命名
vue 方法放置顺序
components
props
data
computed
created
mounted
metods
activited
update
beforeRouteUpdate
filter
watch
method 自定义方法命名
动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）
ajax 方法以 get、post 开头，以 data 结尾（good：getListData、postFormData）（bad：takeData、confirmData、getList、postForm）
事件方法以 on 开头（onTypeChange、onUsernameInput）
init、refresh 单词除外
尽量使用常用单词开头（set、get、open、close、jump）
驼峰命名（good: getListData）（bad: get_list_data、getlistData）
data props 方法注意点
使用 data 里的变量时请先在 data 里面初始化
props 指定类型，也就是 type
props 改变父组件数据 基础类型用 $emit ，复杂类型直接改
ajax 请求数据用上 isLoading、isError 变量
不命名多余数据，现在是详情页、你的数据是 ajax 请求的，那就直接声明一个对象叫 d，而不是每个字段都声明
表单数据请包裹一层 form
生命周期方法注意点
不在 mounted、created 之类的方法写逻辑，取 ajax 数据，
在 created 里面监听 Bus 事件
例
文件路径
src
    assets
        ...
apis
        ...
common
        ...
    components
        ...
    views
        car
            CarEdit.vue
            CarList.vue
            CarDetai.vue
        user
            UserDetail.vue
            UserEdit.vue
            UserPasswordRest.vue
        customer
            CustomerCardItem.vue
            CustomerList.vue