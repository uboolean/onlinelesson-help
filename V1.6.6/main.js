//学习通挂课助手 By Boolean
//开源协议CPL3.0，使用请遵循相关协议
//版本 V1.6.6
//build 2022-3-30-22:40

/**
 
    修复bug
        选错后需要重新观看题会卡循环

 */
auto.waitFor();
auto.waitFor();
launchApp("学习通");
console.log("开始挂课");
toast("开始挂课");
sleep(3000);
console.log("\u811a\u672c\u4f5c\u8005\u0042\u006f\u006f\u006c\u0065\u0061\u006e");
//全局变量定义区
var n=0;//记录章节数量
var myindex = new Array();//记录章节
var judge_t=0;//记录视频是否重新观看，0说明没有重新观看，1说明已经重新观看
var key='A';
var next_key='A';



function finds(){
    var ico=id("tv_icon").find(100);
    var index=id("tv_sub_index").find(100);
    var title=id("tv_title").find(100);
    var temp=ico.length;
    for(var i=0;i<temp;i++){
    //log(ico[i].text()+"   "+index[i].text()+"\n")
        if((ico[i].text()==1 || ico[i].text()==2 )&& title[i].text()!="单元测验"){
            myindex[n]=index[i].text();
            n++;
        }
    }
    }

function find_sub(){
    var swipe_number=0;
    var flag=true;
    while(flag){
        finds();
        swipe(device.width * 0.75,device.height*0.7,device.width * 0.75,device.height * 0.3,500);
        if(text("已经到底啦~(>_<)~~").findOne(100)!=null){
            flag=false;
        }
        swipe_number++;
    }
    swipe_number=swipe_number+3;
    while(swipe_number!=0){
        gesture(500, [device.width * 0.75, device.height * 0.3], [device.width * 0.75, device.height * 0.7]);
        swipe_number--;
    }
}

find_sub();

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

//计算下一个选项
function nextkey(t){
    var key="A";
    if(t=="B"){
        key="C";
    }else if(t=="C"){
        key="D";
    }
    return key;
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
    text=text.split(":");
    var minutes=text[0];
    minutes=60*(Number(minutes));
    var seconds=text[1];
    var time_now=Number(seconds)+minutes;
    var time_timing=read("/sdcard/boolean/com.iambin.top.xuexiton/time.bin");
    if (time_now+60<time_timing){
         judge_t=1;
    }else{
         judge_t=0;
    }
    //写入视频现在的时间
    write("/sdcard/boolean/com.iambin.top.xuexiton/time.bin",time_now);
}

//重新观看回答模块
function answer_again(){
    var key=next_key;
    var find_key=text(key).findOne(100);
    if (find_key==null){
        swipe(300,500,300,200,500);
    }
        click(key);
        sleep(100);
        click("提交");
        click("继续");
        sleep(500);
        var submit_again=text("提交").findOne(100);
        var go=text("继续").findOne(100);
        next_key=nextkey(key);
    if (submit_again!=null || go!=null){
        click(next_key);
        click("提交");
        click("继续");
        sleep(500);
        console.log("选择"+key+"错误已选择"+next_key);
        
    }
    //改变重新观看视频结果
    judge_t=0;
    sleep(6000);
    judge();
}


//进入视频
function enter(){
    bool=true;
    while(bool){
        var video1=id("ext-gen1046").findOne(100);
        var video2=id("ext-gen1045").findOne(100);
        if (video1!=null){
            video1.click();
            bool=false;
        }else{
            sleep(1000);
        }
        if (video2!=null){
            video2.click();
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
            gesture(500, [device.width * 0.75, device.height * 0.7], [device.width * 0.75, device.height * 0.3]);
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
    key='A';
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
                    answer_again();
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

function judge_unit(i){
    var n=i;
    while(Number(myindex[n-1])>=Number(myindex[i])){
        i++;
    }
    return i;
}


//主函数
function main(){
    start_timing();
    for(var i = 0;i < n;i++){
        if(i>0){
            i=judge_unit(i);
        }
        find_unit_text(myindex[i]);
        toast("成功进入视频"+myindex[i]);
        console.log("成功进入"+myindex[i]+"视频");
        sleep(8000);
        practice();
        toast("练习模块结束");
        console.log("练习模块结束");
        sleep(1000);
        complete();
        if(i<n){
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
console.log("挂课结束");
engines.stopAllAndToast();//结束所有脚本
