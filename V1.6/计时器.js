files.create("/sdcard/boolean/com.iambin.top.xuexiton/");
function write(time){
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/time.bin", "w");
    file.write(time);
    file.close();
}

//初始化文件
function start(){
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/time.bin", "w");
    file.write("0");
    file.close();
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/timing_restart.bin", "w");
    file.write("0");
    file.close();
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/.judge.bin", "w");
    file.write("0");
    file.close();
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/key.bin", "w");
    file.write("A");
    file.close();
    
}

function read_time(){
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/time.bin");
    var state=file.readline();
    file.close();
    return state;
}

function read_restart(){
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/timing_restart.bin")
    var restart=file.readline();
    file.close();
    return restart;
}

function change_restart(){
    var file = open("/sdcard/boolean/com.iambin.top.xuexiton/timing_restart.bin", "w");
    file.write("0");
    file.close();
}

start();
var time=0;
while(true){
    var read_time_text=read_time();
    var read_restart_text=read_restart();
    if (Number(read_time_text)+60<time){
        time=Number(read_time_text);
        write(time);
        sleep(10000);
        time=time+10;
    }else{
        if(read_restart_text=="1"){
            time=0;
            change_restart;
        }
        write(time);
        sleep(10000);
        time=time+10;
    }

}
