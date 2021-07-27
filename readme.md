# 创建一个视频进度条

需要 `ffmpeg`

默认字体: 文泉驿等宽正黑

arch 下载安
```
sudo pacman -Sy -y wqy-zenhei ffmpeg nodejs
git clone xxx

```


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
-s 1920x100 尺寸，默认1920x100
--pb [pbColor] processBar color
-font
-fontSize
-fontColor
-bgColor
-fenceColor
-fenceBorderColor
-processColor
```

## 使用

```sh
./bin/videoBar -s 1920x100 videoBar_sample.txt
```
