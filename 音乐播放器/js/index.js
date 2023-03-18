$("button").eq(0).click(function () {
    // console.log("button被点击了");
    $("button").nextAll(".options-1").css("margin-left", 0);
    $("button").nextAll(".volume-1").css("left", 380);
    $(this).css("visibility", "hidden");
    $(".image").css("transform", "translateX(50px) scaleX(0.74)");
    $("button").eq(1).css("visibility", "visible");


});
$("button").eq(1).click(function () {
    // console.log("button2被点击了");
    $(this).nextAll(".volume-1").css("left", 280);
    $("button").nextAll(".options-1").css("margin-left", -100);
    $(this).css("visibility", "hidden");
    $(".image").css("transform", "translateX(-50px) scaleX(0.74)");
    $("button").eq(0).css("visibility", "visible");
});
$(".zhong").click(function () {
    // console.log("3被点击了");
    $("button").nextAll(".options-1").css("margin-left", -100);
    $("button").nextAll(".volume-1").css("left", 380);
    $("button").css("visibility", "visible");
    $(".image").css("transform", "translateX(0px) scaleX(1)");
});

// $(".one-1 button").click(function () {
//     console.log(document.querySelector(".options-1"));
//     document.querySelector(".options-1").style.marginLeft = 0;
// })



// 零填充函数
function zeroFill(num) {
    return num < 10 ? "0" + num : num;
}

// 封装一个函数,把秒数转成时分秒的格式
function formatTime(totalSeconds) {
    // console.log("totalSeconds=>", totalSeconds); //可以
    // var h = zeroFill(Math.floor(totalSeconds / 3600));
    var m = zeroFill(Math.floor(totalSeconds % 3600 / 60));
    // console.log(m);
    var s = zeroFill(Math.floor(totalSeconds % 60));
    // console.log(s);
    // return h + ":" + m + ":" + s;
    return m + ":" + s;
}

// 音频总时长
var totalTime = 0;

// 当音频可以播放的时候，显示总时长事件
var audio = $("audio")[0];

audio.oncanplay = function () {
    // 获取音频的总时长
    totalTime = audio.duration;
    // console.dir(audio);
    // console.log(audio.duration);
    // console.log(audio.currentTime);
    // console.log(totalTime);
    // 设置总时长
    $(".playbar_right").text(formatTime(totalTime));
}

// 播放暂停功能
$(".icon-play").click(function () {
    // 判断当前是否为暂停状态
    // console.log(audio.paused);
    if (audio.paused) { // 当前为暂停状态
        // 播放音频
        audio.play();
        audio.oncanplay();
        // 改变图标
        $(".icon-play i").removeClass("iconfont icon-bofang").addClass("iconfont icon-zanting");
    } else {
        // 暂停音频
        audio.pause();
        audio.oncanplay();
        // 改变图标
        $(".icon-play i").removeClass("iconfont icon-zanting").addClass("iconfont icon-bofang");
    }
});

// 音频播放的时候,更新播放进度(包括更新当前播放时长以及进度条长度)
audio.ontimeupdate = function () {
    // 获取当前播放时长
    var currentTime = audio.currentTime;
    // console.log(currentTime);//可以
    // 设置当前播放时长
    $(".playbar_left").text(formatTime(currentTime));
    // 通过 当前播放时长 / 总时长 得到一个比例
    var percentage = currentTime / totalTime;
    // 设置.line的width(使用的是百分比)
    $(".playbar_inner").width(percentage * 100 + "%");
}

// 快进(跃进)功能
var progressWidth = $(".song-play").width(); // 获取宽度

$(".song-play").click(function (e) {
    // 获取鼠标点击时候, 在.progress盒子内部的坐标
    // console.log(e.offsetX);

    // 计算比例
    var percentage = e.offsetX / progressWidth;
    // 设置currentTime( 比例 * 音频总时长 )
    audio.currentTime = percentage * totalTime;
});



var playlist = [
    {
        name: "天使",
        src: "./audio/天使.mp3",
        poster: "????.png"
    },
    {
        name: "crazy in love",
        src: "./audio/crazy in love.mp3",
        poster: "????.png"
    }
    ,
    {
        name: "麻醉师",
        src: "./audio/麻醉师.mp3",
        poster: "????.png"
    }
    ,
    {
        name: "Lover",
        src: "./audio/Lover.mp3",
        poster: "????.png"
    }
    ,
    {
        name: "血型爱情故事",
        src: "./audio/血型爱情故事.mp3",
        poster: "????.png"
    }
    ,
    {
        name: "三国恋",
        src: "./audio/三国恋.mp3",
        poster: "????.png"
    }
];

// 全局变量控制歌曲位置 
let count = 0;

// var audioP = $("#audio");
// console.log(audioP.attr("src"));

var iconBack = document.querySelector(".icon-back");
// console.log(iconBack);
var iconNext = document.querySelector(".icon-next");
// console.log(iconNext);
var songName = document.querySelector(".image .zhong .details h2");
// console.log(songName);


// 封装函数   下一首和播放完再下一首
function Next() {
    return function () {
        count++;
        if (count >= playlist.length) {
            count = 0;
        }
        audio.src = playlist[count].src;
        songName.innerHTML = playlist[count].name;
        audio.play();
    }
}
// 上一首 
function Back() {
    return function () {
        if (count == 0) {
            count = playlist.length;
        }
        count--;
        audio.src = playlist[count].src;
        songName.innerHTML = playlist[count].name;
        audio.play();
    }
}


// // 歌曲添加到列表中
// for (let i=0;i<playlist.length;i++){
//     let obj=
// }

//放完然后直接播放下一首歌曲
audio.onended = Next();

//点击上一首
iconBack.onclick = Back();

//点击下一首
iconNext.onclick = Next();

// //点击下拉列表里面的歌曲
// select.ondblclick = function () {count = select.selectedIndex;audio.src = sings[count].srcaudio.play();