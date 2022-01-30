//学习通挂课助手 By Boolean
//开源协议MIT，使用请遵循相关协议
//版本 V1.5.5
//build 2022-1-14-18:52


/**
 key 
    已知bug
        多选题，选错后需要重新观看题会卡循环

 */
auto.waitFor();
launchApp("学习通");
console.log("开始挂课");
toast("开始挂课");
console.log("\u811a\u672c\u4f5c\u8005\u0042\u006f\u006f\u006c\u0065\u0061\u006e");
var start = rawInput("请输入开始章节", "10.1");
var end = rawInput("请输入结束章节", "10.5");
toast("开始挂课从"+start+"到"+end);
console.log("开始挂课从"+start+"到"+end);
start = start.split(".");
end = end.split(".");
var unit=start[0];
start=Number(start[1]);
end=Number(end[1]);

//读文件函数
function read(path){
    var file=open(path);
    var value=file.readline();
    file.close();
    return value;
}

//写文件函数
function write(path,text){
    var file=open(path,"w");
    file.write(text);
    file.close();
}



function judge(){
    var current=id("land_current_time").findOne(100);
    if (current==null){
        click(500,200);
        sleep(200);
        current=id("land_current_time").findOne(100);
        var text=current.text();
    }else{
        var text=current.text();
    }
    text=test.split(":");
    var minutes=text[0];
    minutes=60*(Number(minutes));
    var seconds=text[1];
    var time_now=Number(seconds)+minutes;
    var time_timing=read("/sdcard/boolean/com.iambin.top.xuexiton/time.bin");
    if (time_now+60<time_timing){
        var judge_t=1;
    }else{
        var judge_t=0;
    }
    //写入视频现在的时间
    write("/sdcard/boolean/com.iambin.top.xuexiton/time.bin",time_now);
    //写入结果，0说明没有重新观看，1说明已经重新观看
    console.log(time_now+" "+time_timing);
    write("/sdcard/boolean/com.iambin.top.xuexiton/.judge.bin",judge_t);
}

//重新观看回答模块
function answer_again(){
    var key=read("/sdcard/boolean/com.iambin.top.xuexiton/key.bin");
    console.log(key);
    console.log(typeof(key));
    var find_key=text(key).findOne(100);
    if (find_key==null){
        swipe(300,500,300,200,500);
    }
        click(key);
        sleep(100);
        click("提交");
        click("继续");
        sleep(500);
    //改变重新观看视频结果
    write("/sdcard/boolean/com.iambin.top.xuexiton/.judge.bin","0");
    sleep(6000);
}


//进入视频
function enter(){
    bool=true;
    while(bool){
        var video=text("play").findOne(100);
        if (video!=null){
            click("play");
            bool=false;
        }else{
            sleep(1000);
        }
    }
}

//寻找章节
function find_unit_text(id){
    var bool=true;
    while (bool){
        var check=text(id).findOne(100);
        if (check==null){
            swipe(500,600,500,300,500);
            sleep(400);
            bool=true;
        }
        else{
            bool=false;
        }
    }
    click(id);
    sleep(1000);
    click("视频");
    sleep(1000);
    enter();
}

//回答选择题
function answer(){
    click("A");
    click("提交");
    var key='A';
    sleep(500);
    console.log("已选择A");
    var submit_again=text("提交").findOne(100);
    var go=text("继续").findOne(100);
    if (submit_again!=null || go!=null){
        click("B");
        click("提交");
        click("继续");
        sleep(500);
        key='B';
        console.log("选择A错误已选择B");
        var submit_again=text("提交").findOne(100);
        var go=text("继续").findOne(100);
    }
    if(submit_again!=null || go!=null){
        swipe(300,500,300,200,500);
        click("C");
        click("提交");
        click("继续");
        sleep(500);
        key='C';
        console.log("选择B错误已选择C");
        var submit_again=text("提交").findOne(100);
        var go=text("继续").findOne(100);
    }
    if (submit_again!=null || go!=null){
        click("D");
        click("提交");
        click("继续");
        sleep(500);
        key='D';
        console.log("选择C错误已选择D");

    }
    write("/sdcard/boolean/com.iambin.top.xuexiton/key.bin",key);
    console.log("完成一道选择题");
    sleep(6000);
    judge();
}

//练习模块，进入视频到视频结束运行的模块
function practice(){
    var bool=true;
    while (bool){
        var net_error=text("重试").findOne(100);
        var current=id("land_current_time").findOne(100);
        var total=id("land_total_time").findOne(100);
        if (net_error!=null){
            click("重试");
            console.log("网络错误，已点击重试");
            sleep(10000);//防止网络缓慢异常
        }
        var if_end=id("start").findOne(100);
        if(if_end==null){
            var submit=text("提交").findOne(100);

            if(submit==null){
                sleep(3000);
            }
            else if(submit!=null){
                var result=read("/sdcard/boolean/com.iambin.top.xuexiton/.judge.bin");
                if (result=="0"){
                    answer();
                }                
                if (result=="1"){
                    answer_again;
                }
            }
        }
        else{
            current=current.text();
            total=total.text();
            if (current==total && current!=null){

            bool=false;
            }
        }
    }

}

//结束退出视频
function complete(){
    var ok=id("back").findOne(100).click();
    sleep(500);
    var left=id("toolbar_left_action").findOne(100).click();
    sleep(500);
}

//打开计时器
function start_timing(){
    var path = $files.path("./计时器.js");
    engines.execScriptFile(path);
}

//主函数
function main(){
    start_timing();
    for(var i = start;i <= end;i++){
        var id=unit+"."+String(i);
        console.log(id);
        find_unit_text(id);
        toast("成功进入视频");
        console.log("成功进入"+id+"视频");
        sleep(8000);
        practice();
        toast("练习模块结束");
        console.log("练习模块结束");
        sleep(1000);
        complete();
        if(i<end){

            console.log("开始挂下一节课");
            sleep(2000);
        }else{
            console.log("挂课结束");
        }
        //需要重新计时
        var file = open("/sdcard/boolean/com.iambin.top.xuexiton/timing_restart.bin", "w");
        file.write("1");
        file.close();

    }
}


main();
engines.stopAllAndToast();//结束所有脚本
