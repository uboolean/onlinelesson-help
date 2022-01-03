auto.waitFor();
var start = rawInput("请输入开始章节", "1.0");
var end = rawInput("请输入结束章节", "1.9");
start=Number(start)*10;
end=Number(end)*10;
toast("开始刷课从"+start+"到"+end);
function find_unit_text(id){
    var bool=true;
    while (bool){
        var check=text(id).findOne(100);
        if (check==null){
            swipe(500,800,500,300,500);
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

function practice(){
    var bool=true;
    while (bool){
        var if_end=id("start").findOne(100);
        if(if_end==null){
            click(500,300);
        }

        var submit=text("提交").findOne(100);
        if(submit==null){
            var current=id("land_current_time").findOne(100).text();
            var total=id("land_total_time").findOne(100).text();
        }

        if(submit==null && current!=total){
            sleep(30000);
        }
        else if(submit!=null){
            click("A");
            click("提交");
            sleep(500);
            var submit_again=text("提交").findOne(100);
            if (submit_again!=null){
                click("B");
                click("提交");
                sleep(500);
                var submit_again=text("提交").findOne(100);
            }

            if (submit_again!=null){
                click("C");
                click("提交");
                sleep(500);
                var submit_again=text("提交").findOne(100);
            }

            if (submit_again!=null){
                click("D");
                click("提交");
            }
            sleep(30000);
        }
        else if (current==total){

            bool=false;
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
    for(var id = start;id <= end;id++){
        find_unit_text(id/10);
        toast("成功进入视频");
        sleep(8000);
        practice();
        toast("练习模块结束");
        sleep(2000);
        complete();
        sleep(2000);
        toast("开始下一节课程");
    }
}
main();