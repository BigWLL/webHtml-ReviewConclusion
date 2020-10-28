# webHtml-ReviewConclusion

webHtml-ReviewConclusion 主要是对前端知识的复习总结，包括一些小例子、知识点...

## 知识点

#### css3 实现轮播图

轮播图的实现主要是使用 css3 的 animation + @keyframes  
@keyframes 总共有五种图片，所以相隔移动的位置，平均划分；

`animation: swiper-dot 15s steps(1,end) infinite;`

```
@keyframes swiper{
            0%,
            100%{
                left:0;
            }
            20%{
                left: -800px;
            }
            40%{
                left: -1600px;
            }
            60%{
                left: -2400px;
            }
            80%{
                left: -3200px;
            }
        }
```

#### 仿支付宝密码框

- 使用的 js 实现

#### 居中定位

- 包括已知宽高定位和未知宽高定位，绝对定位、Flex、grid 居中实现

#### 布局

- 两栏布局--右侧栏自适应（BFC 经典问题）

* 三栏布局

* 九宫格布局

#### 裁剪图片实现拼图

- 裁剪图片 使用的是 css3 的画布，canvas ，相邻两块图片移动使用 move 获取点击的坐标，重新对画布进行绘图。

#### css 实现单选 radio 框

- 注意在样式实现上 选中的元素 :check

#### 纯 css 实现判断四个方向划入效果

- 从不通方向使鼠标指针移过下面的内容，使用的:hover 和 透明度 opacity
