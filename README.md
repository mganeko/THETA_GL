# THETA_GL
THETA WebGL Viewer using three.js (Javascript 3D library)


[Many thanks to [mganeko](https://github.com/mganeko) for this useful repo! This English translation of the README.md file for mganeko’s THETA_GL repo provided by the RICOH THETA Unofficial Guide. Original Japanese language README.md file information is appended below. This is provided “as-is and unofficial." Comments and edits welcome. More information on useful GitHub repos for the RICOH THETA curatated by the RICOH THETA Unofficial Guide [here](http://lists.theta360.guide/t/theta-github-repository/199/1)]


## Acknowledgments

* In order to render WebGL, three.js is used
  * To show rendering of full photospheres, samples of panoramas / equirectangular are referenced
  * three.js is covered under the MIT license

* In order to handle UV Mapping, the following data was utilized:
  * Hekomi’s [“Using RICOH THETA Live View With Unity”](http://lists.theta360.guide/t/using-ricoh-theta-live-view-with-unity/70/1)
  * Based on the UV Mapping information above, a mapping JSON converted and fine tuned for three.js by a Mr. Baba

* Using [anzu-sdk.js](https://github.com/shiguredo/anzu-js-sdk) from the WebRTC SFU as a Service called Anzu, a WebRTC distribution service
  * The Anzu WebRTC SFU as a Service is provided by the company Shiguredo, K.K. (Japan)
  * anzu-sdk.js is under the Apache License Version 2.0

Thank you, everyone.

## Operating Environment

I have tested and confirmed the following operating environment:

* Chrome 47.0.2526.106 (64-bit) for MacOS X
* Firefox 43.0.3 for MacOS X
* Chrome 47.0.2526.106 m for Windows
* Firefox 43.0.2 for Windows
* Chrome for Android
* Firefox for Android

_Maybe because Firefox for Android uses m4v format, playback for recorded video files is not possible._

## Samples

### Playback of prerecorded video file
* [Displaying a video sample](https://mganeko.github.io/THETA_GL/movie_360.html) taken with THETA S

### Connecting to USB Camera
* [Sample using `navigator.getUserMedia()`](https://mganeko.github.io/THETA_GL/movie_360.html) with camera video sample 

### Using WebRTC SFU Distribution Video
[Translator’s Note: This section of links appears to need an account with this service, and this section of links do not appear to work.]
* Sample of [Anzu WebRTC SFU as a Service](https://anzu.shiguredo.jp/) video distribution service 
* [Example of distribution](https://mganeko.github.io/THETA_GL/theta_anzu_up.html)
* [Example of viewing](https://mganeko.github.io/THETA_GL/theta_anzu_360.html)
* ~~After starting distribution from the Anzu Dashboard, set the Channel ID and connect~~ [crossed out in original Japanese README]
* Confirm the Channel ID and distribution token in the [Anzu Dashboard](https://mganeko.github.io/THETA_GL/theta_anzu_up.html), then input them on the page and start broadcasting. For viewing, set the Channel ID on [theta_anzu_360.html](https://mganeko.github.io/THETA_GL/theta_anzu_360.html) page and connect.

## Usage

#### Prep

* Load three.js and three.min.js in HTML
  * Download the newest version [here](http://github.com/mrdoob/three.js/zipball/master) or use the [CDN version](https://cdnjs.com/libraries/three.js/)
* Load theta_gl.js in HTML
  * You must have the JSON file in the UV folder when you use it
* When you use Anzu, anzu.js or anzu.min.js is required
  * Get the [newest version from Github](https://github.com/shiguredo/anzu-js-sdk)


## Initialization

* `THETA_GL.init(divId, autoResuze, debugFlag)`
  * `string divId`: It will be a Canvas container displaying WebGL, set the div element ID [REQUIRED]
  * `bool autoResize`: Comply with window resize or not (true/false) - default is true
  * `bool debugFlag`: For debugging, running video elements or displaying canvas elements, or displaying log information in the console - default is false

#### Starting WebGL Animation

* `THETA_GL.startAnimate()`

#### Setting the source URL of videos
* `THETA_GL.setVideoSrc(url, loopFlag)`
  * `string url`: URL for videos. Use a web URL or set a URL created with `URL.createObjectURL()` [REQUIRED]
  * `bool loopFlag`: Run the video in a loop or not (true/false) - default is false

#### Stopping Video
* `THETA_GL.stopVideoSrc()`

#### Setting Device Orientation
* `THETA_GL.followOrientation(flag)`
  * `bool flag`: Setting whether to follow the smart device orientation or not. [REQUIRED]

### Code Samples
```
var url = 'http://yourserver.com/video.mp4';
THETA_GL.init('container', true, false);
THETA_GL.setVideoSrc(url, true);
THETA_GL.startAnimate();
```

## License

THETA_GL is under the MIT license


[Original Japanese README starts here]
----

# THETA_GL
THETA WebGL Viewer with three.js

RICHO THETA S の映像をWebGL(three.js)とUVマッピングを用いて、全天球動画としてブラウザで表示します。

## 謝辞
* WebGLでの描画には、[three.js](http://threejs.org/)を利用しています
  * 全天球描画には[panorama / equirectangularサンプル](http://threejs.org/examples/#webgl_panorama_equirectangular)を参考にしています。
  * three.js はMITライセンスで提供されています
* UVマッピングの作成には、次のデータを利用させていただいています
  * 凹みtips [発売前に RICOH THETA S のライブビューを Unity でリアルタイムに全天球で見るやつ作ってみた](http://tips.hecomi.com/entry/2015/10/11/211456)
  * 上記のUnity用UVマッピングを元に、baba氏がthree.js用に変換、微調整したマッピングjsonデータ
* WebRTC配信サービス [WebRTC SFU as a Service Anzu](https://anzu.shiguredo.jp/) の利用サンプルには、[anzu-sdk.js](https://github.com/shiguredo/anzu-js-sdk)を利用しています
  * WebRTC SFU as a Service Anzuは株式会社時雨堂が提供しているサービスです
  * anzu-sdk.js は Apache License Version 2.0 で提供されています

皆様、どうもありがとうございます。


## 動作環境
次の環境で動作確認しています
* Mac OS X用 Chrome 47.0.2526.106 (64-bit)
* Mac OS X用 Firefox 43.0.3
* Windows用 Chrome 47.0.2526.106 m
* Windows用 Firefox 43.0.2
* Android用 Chrome
* Android用 Firefox

※Android用Firefoxでは、m4v形式のためか録画した映像ファイルは再生できていません


## サンプル
https://mganeko.github.io/THETA_GL/

### 録画した映像ファイルを再生
* THETA Sで録画したファイルを表示するサンプルです
* [movie_360.html](https://mganeko.github.io/THETA_GL/movie_360.html)

### USBカメラとして接続して利用
* navigator.getUserMedia()を利用してカメラ映像を取り込んだものを表示するサンプルです
* [theta_360.html](https://mganeko.github.io/THETA_GL/theta_360.html)

### WebRTC SFU 配信映像を利用
* [WebRTC SFU as a Service Anzu](https://anzu.shiguredo.jp/) の配信映像を表示するサンプルです
* 配信側: [theta_anzu_up.html](https://mganeko.github.io/THETA_GL/theta_anzu_up.html)
* 視聴側: [theta_anzu_360.html](https://mganeko.github.io/THETA_GL/theta_anzu_360.html)
* ~~[Anzuダッシュボード](https://anzu.shiguredo.jp/dashboard.html)で配信を開始してから、サンプルでチャネルIDを指定して接続してください~~
* [Anzuダッシュボード](https://anzu.shiguredo.jp/dashboard.html)でチャンネルIDと配信用トークンを確認し、[theta_anzu_up.html](https://mganeko.github.io/THETA_GL/theta_anzu_up.html)で指定してから配信してください。視聴側は[theta_anzu_360.html](https://mganeko.github.io/THETA_GL/theta_anzu_360.html)でチャネルIDを指定して接続してください


## 使い方
#### 準備
* HTMLでthree.js または trhee.min.js を読み込みます
  * [最新版をダウンロード](http://github.com/mrdoob/three.js/zipball/master)するか、[CDNのもの](http://cdnjs.com/libraries/three.js/)を利用します
* HTMLでtheta_gl.jsを読み込みます
  * 利用にあたっては、uvフォルダの下のjsonファイルも必要になります
* Anzuを利用する場合は、anzu.js または anzu.min.js も必要です
  * [最新版をgithub](https://github.com/shiguredo/anzu-js-sdk)から取得してください

#### 初期化
* THETA_GL.init(divId, autoResuze, debugFlag)
  * string divId : WebGLを表示するCanvasのコンテナとなる、div要素のIDを指定 ※必須
  * bool autoResize : Windowのリサイズに追従するかどうか(true/false) ※省略時はtrue
  * bool debugFlag : デバッグ用に作業用のvideo要素、canvas要素を表示するか、ログ情報をconsoleに表示するか ※省略時はfalse

#### WebGLアニメーションの開始
* THETA_GL.startAnimate()

#### 映像ソースURLの指定
* THETA_GL.setVideoSrc(url, loopFlag)
  * string url : 映像のURL。Web上のURLか、URL.createObjectURL()で生成したURLを指定 ※必須
  * bool loopFlag : 映像をループ再生するかどうか(true/false)  ※省略時はfalse

#### 映像の停止
* THETA_GL.stopVideoSrc()

#### デバイスの方向に追従
* THETA_GL.followOrientation(flag)
  * bool flag: スマートデバイスの方向に追従されるかどうかを指定 ※必須

### コード例
```
var url = 'http://yourserver.com/video.mp4';
THETA_GL.init('container', true, false);
THETA_GL.setVideoSrc(url, true);
THETA_GL.startAnimate();
```


## ライセンス
THETA_GLはMITランセンスで提供されます

![Analytics](https://ga-beacon.appspot.com/UA-73311422-5/Theta-WebGL-viewer)
