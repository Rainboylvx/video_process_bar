# 创建一个视频进度条

需要 `ffmpeg`

参数

准备一个文本文件写入时间和标题,默认为`videoBar.txt`，格式如下

```
00:1:14  , 引入
00:7:14  , 如何使用
00:10:14 , 下载安装
00:15:14 , 注意事项
00:20:14 , 结语
```

- 以`,`分隔时间与标题
- 一行一个
- 最后一行的时间是结束的时间

```plaintext
-s 1920*100 尺寸，默认1920*100
-font
-fontSize
-fontColor
-bgColor
-fenceColor
-fenceBorderColor
-processColor
```
