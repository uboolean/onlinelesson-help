//学习通挂课助手 By Boolean
//开源协议MIT，使用请遵循相关协议
//版本 V1.5
//build 2022-1-4-12:00 
auto.waitFor();
launchAPP("学习通");
console.log("开始挂课");
toast("开始挂课");
console.log("\u811a\u672c\u4f5c\u8005\u0042\u006f\u006f\u006c\u0065\u0061\u006e");
var start = rawInput("请输入开始章节", "2.8");
var end = rawInput("请输入结束章节", "2.8");
var unit=start.substr(0,2);
toast("开始挂课从"+start+"到"+end);
console.log("开始挂课从"+start+"到"+end);
start=Number(start.substr(2,4));
end=Number(end.substr(2,4));


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
    console.log("已选择A");
    var submit_again=text("提交").findOne(100);
    if (submit_again!=null){
        click("B");
        click("提交");
        sleep(500);
        console.log("选择A错误已选择B");
        var submit_again=text("提交").findOne(100);
    }
    if(submit_again!=null){
        swipe(300,500,300,200,500);
        click("C");
        click("提交");
        sleep(500);
        console.log("选择B错误已选择C");
        var submit_again=text("提交").findOne(100);
    }
    if (submit_again!=null){
        click("D");
        click("提交");
        sleep(500);
        console.log("选择C错误已选择D");

    }
    console.log("完成一道选择题");
    sleep(6000);
}


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
    for(var i = start;i <= end;i++){
        var id=unit+String(i);
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

    }
}


main();
