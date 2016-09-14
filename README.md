# tips
自定义的tips插件

## 使用方法
在标签中设置以下几个属性:
    1. data-selftooltip-point #值为bottom、left、right和top，该值为设置显示方向；
    2. title #值为字符串，该值可以在tip中显示出来；
    3. data-selftooltip-css #值为JSON格式的字符串，其中目前只能设置两个属性：bgColor(tip的背景颜色)、color(tip的字体颜色)；

然后在页面中引入js文件即可，该插件为自动搜索满足条件的标签并在鼠标指针移动上去后显示tips。