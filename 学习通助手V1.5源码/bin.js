//学习通挂课助手 By Boolean
//开源协议MIT，使用请遵循相关协议
//版本 V1.5
//build 2022-1-4-12:00 

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
    click("play");
}


function answer(){
    click("A");
    click("提交");
    sleep(500);
    write("已选择A");
    var submit_again=text("提交").findOne(100);
    if (submit_again!=null){
        click("B");
        click("提交");
        sleep(500);
        write("选择A错误已选择B");
        var submit_again=text("提交").findOne(100);
    }
    if(submit_again!=null){
        swipe(300,500,300,200,500);
        click("C");
        click("提交");
        sleep(500);
        write("选择B错误已选择C");
        var submit_again=text("提交").findOne(100);
    }
    if (submit_again!=null){
        click("D");
        click("提交");
        sleep(500);
        write("选择C错误已选择D");

    }
    write("完成一道选择题");
    sleep(3000);
}


function practice(){
    var bool=true;
    while (bool){
        var net_error=text("重试").findOne(100);
        var current=id("land_current_time").findOne(100);
        var total=id("land_total_time").findOne(100);
        if (net_error!=null){
            click("重试");
            write("网络错误，已点击重试");
            sleep(10000);//防止网络缓慢异常
        }
        var if_end=id("start").findOne(100);
        if(if_end==null){
            var submit=text("提交").findOne(100);

            if(submit==null){
                sleep(3000);
            }
            else if(submit!=null){

                answer();
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


function complete(){
    var ok=id("back").findOne(100).click();
    sleep(500);
    var left=id("toolbar_left_action").findOne(100).click();
    sleep(500);
}


function main(){
    auto.waitFor();
    //以读取模式打开文件
    file = open("/sdcard/Android/data/com.iambin.top.xuexiton/.unit.bin", "r");
    var start=file.readline();
    var end=file.readline();
    file.close();
    launchApp("学习通");
    sleep(1500);
    write("开始挂课");
    toast("开始挂课");
    write("\u811a\u672c\u4f5c\u8005\u0042\u006f\u006f\u006c\u0065\u0061\u006e");
    var unit=start.substr(0,2);
    toast("开始挂课从"+start+"到"+end);
    write("开始挂课从"+start+"到"+end);
    start=Number(start.substr(2,4));
    end=Number(end.substr(2,4));
    
    for(var i = start;i <= end;i++){
        var id=unit+String(i);
        find_unit_text(id);
        toast("成功进入"+id+"视频");
        write("成功进入"+id+"视频");
        sleep(8000);
        practice();
        toast("练习模块结束");
        write("练习模块结束");
        sleep(1000);
        complete();
        if(i<end){
            write("开始挂下一节课");
        }else{
            write("挂课结束");
        }

    }
}

function write(key){
    var time = new Date();
    file = open("/sdcard/Android/data/com.iambin.top.xuexiton/log.bin", "a");
    file.writeline(time+"------"+key);
    file.close();
}

function write_men(){
    var time = new Date();
    var total = device.getTotalMem();
    var avail = device.getAvailMem();
    var usage =100*avail/total; 
    file = open("/sdcard/Android/data/com.iambin.top.xuexiton/log.bin", "a");
    file.writeline(time+"------总内存："+total);
    file.writeline(time+"------已使用内存："+avail);
    file.writeline(time+"------使用率"+usage+"%");
    file.close();
}

function write_masage(){
var str = "";
str += "\n屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
str += "\nbuildId:" + device.buildId;
str += "\n主板:" + device.board;
str += "\n制造商:" + device.brand;
str += "\n型号:" + device.model;
str += "\n产品名称:" + device.product;
str += "\nbootloader版本:" + device.bootloader;
str += "\n硬件名称:" + device.hardware;
str += "\n唯一标识码:" + device.fingerprint;
str += "\nAndroidId: " + device.getAndroidId();
str += "\nMac: " + device.getMacAddress();
str += "\nAPI: " + device.sdkInt;
str += "\n电量: " + device.getBattery();
write(str);

}
write_masage();
write_men();
main();