# 小车总装

## 固定香橙派主板

材料准备：

- 一块已[拆卸外壳](dismantle)的香橙派；
- 小车底盘；
- 白色塑料柱短柱 4 个，长柱 3 个，下图中左为短柱，右为长柱：
    <img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/0.jpg" alt="短柱和长柱" loading="lazy"/>

用到的孔位在下图中用红色圈出：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/1.jpg" alt="孔位" loading="lazy"/>

短柱从底板的下方穿入，长柱在底板的上方拧紧固定，注意让塑料柱靠近孔的边缘以获得比较好的固定效果：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/2.jpg" alt="安装塑料柱" loading="lazy"/>

固定好后的底板如图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/3.jpg" alt="底板" loading="lazy"/>

把香橙派按照下图方向放置在塑料柱上方，并用两个短柱拧紧，位置为红色圈出处：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/4.jpg" alt="安装香橙派" loading="lazy"/>

至此香橙派主板安装完毕。

## 固定拓展板

材料准备：

- 拓展板；
- 小车底盘；
- M3 螺丝 2 个；
- 铜柱 1 个。

将小车底盘翻面，从下方看。找到下图中箭头指示孔位，穿入一颗 M3 螺丝：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/5.jpg" alt="孔位" loading="lazy"/>

将小车翻回来，找到刚才放置的螺丝并用铜柱拧紧：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/6.jpg" alt="安装铜柱" loading="lazy"/>

连接好拓展板与香橙派通讯所需的三根杜邦线（接线顺序见[颜色识别与机械臂教程](../servo#连接香橙派与拓展板)）：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/7.jpg" alt="连接杜邦线" loading="lazy"/>

再用一颗 M3 螺丝穿过拓展板的孔位固定到铜柱上，完成后如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/8.jpg" alt="安装效果" loading="lazy"/>

## 焊接供电板

:::warning

- 下面的内容会用到电烙铁，使用时谨防烫伤，并且务必在使用完毕后断开电烙铁，记得关电！记得关电！！记得关电！！！
- 如果您在焊接过程中遇到困难，可以向其他选手或自动化系科协成员寻求帮助。

:::

材料准备：

- 升压供电板；
- 香橙派供电线；
- 电源插头。

<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/9.jpg" alt="材料准备" loading="lazy"/>

<details>
<summary>零件存放位置</summary>

上述零件存放在 520 东侧的窗台上箭头指示位置：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/10.jpg" alt="存放位置" loading="lazy"/>
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/11.jpg" alt="存放位置" loading="lazy"/>

</details>

首先我们来看电源插头，它的三个引脚对应关系如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/12.jpg" alt="电源插头引脚" loading="lazy"/>

因为小车供电时不会用到地线，为防止它误触供电板焊盘，先将地线掰弯，如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/13.jpg" alt="掰弯地线" loading="lazy"/>

插头与供电板的 VIN 正负极对应，如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/14.jpg" alt="插头对应" loading="lazy"/>

:::tip

焊接的时候可以先挑选一个引脚与其对应的焊盘镀上锡，然后把两者靠近，调整好角度后用烙铁蘸一下连接处即可固定好一个引脚，随后再处理另一个引脚。
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/15.jpg" alt="焊接" loading="lazy"/>

:::

接下来把香橙派的供电线与供电板的 V_OUT 正负极对应好并焊接：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/16.jpg" alt="焊接供电线" loading="lazy"/>

最终结果如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/17.jpg" alt="焊接完成" loading="lazy"/>
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/18.jpg" alt="焊接完成" loading="lazy"/>

## 整车接线

最终的接线会用到一条双头圆头线，存放位置也在东侧窗台:
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/19.jpg" alt="双头圆头线" loading="lazy"/>

母头输入端连接供电电池。公头输出端分别连接拓展板和供电板：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/20.jpg" alt="接线" loading="lazy"/>

将焊好的供电板用双面胶粘在下图所示位置，注意双面胶尽可能覆盖焊点以防短路：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/21.jpg" alt="安装位置" loading="lazy"/>

供电板的输出端连接在香橙派的插头，位置在下图中红圈处：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/22.jpg" alt="连接香橙派" loading="lazy"/>

:::tip

这个插头的焊点周围元件较多，焊接难度较高，插头会由科协成员帮助大家完成焊接。

:::

最终连接完毕的成品如下图所示：
<img src="https://cloud.tsinghua.edu.cn/thumbnail/24f8d1997d1848ec9c72/1024/img/THUDAEI1/install/23.jpg" alt="成品" loading="lazy"/>
