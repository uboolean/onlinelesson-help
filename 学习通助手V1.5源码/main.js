"ui";

var InputLayout = (function() {
    //继承至ui.Widget
    util.extend(InputLayout, ui.Widget);

    function InputLayout() {
        ui.Widget.call(this);
        this.defineAttr("hint", (view, attr, value, defineSetter) => {
            view._hint.setText(value);
        });
        this.defineAttr("text", (view, attr, value, defineSetter) => {
            view._input.setText(value);
        });
    }
    InputLayout.prototype.render = function() {
        return (
            <vertical>
                <text id="_hint" textSize="16sp" margin="4" textColor="gray"/>
                <input id="_input" margin="0 16"/>
            </vertical>
        );
    }
    InputLayout.prototype.getInput = function() {
        return this.view._input.getText();
    };
    ui.registerWidget("input-layout", InputLayout);
    return InputLayout;
})();

ui.layout(
    <vertical>
        <input-layout id="start" hint="请输入开始章节" text="1.1"/>
        <input-layout id="end" hint="请输入结束章节" text="1.8"/>
        <button id="ok" style="Widget.AppCompat.Button.Colored" text="开始"/>
    </vertical>
);

ui.ok.on("click", function() {
    var start =String( ui.start.widget.getInput());
    var end = String(ui.end.widget.getInput());
    files.create("/sdcard/Android/data/com.iambin.top.xuexiton/");
    //以写入模式打开SD卡根目录文件1.txt
    var file = open("/sdcard/Android/data/com.iambin.top.xuexiton/.unit.bin", "w");
    file.writeline(start);
    file.writeline(end);
    file.close();
    var path = $files.path("./bin.js");
    engines.execScriptFile(path);
});


