function finds(){
ico=id("tv_icon").find(100);
index=id("tv_sub_index").find(100);
for(var i=0;i<=10;i++){

//log(ico[i].text()+"   "+index[i].text()+"\n")
    if(ico[i].text()==1){
        myindex[n]=index[i].text();
        n++;
    }
}
}
var n=0;
var myindex = new Array();
var h=device.height;
var flag=true;
while(flag){
    finds();
    swipe(500,h-400,500,300,500);
    if(text("已经到底啦~(>_<)~~").findOne(100)!=null){
        flag=false;
    }
}

for(n=n-1;n>=0;n--){
    log(myindex[n]);
}
