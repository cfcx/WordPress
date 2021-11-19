jQuery(function($){
    if($("#task-timer").length){
        endtime = new Date($("#task-timer").data("end"));
        timerDown();
    }

    $(".task-bid-submit").click(function(){
        if(!$(this).hasClass('disabled')){
            var task_id = $(this).data("id"),
                bid_price = '',
                bid_content = $("#task_bid_content").val(),
                that = $(this);
            if($("#task_bid_price").length){
                bid_price = $("#task_bid_price").val();
                if(!bid_price){
                    layer.msg("请填写报价");
                    return false;   
                }
            }
            if(!bid_content){
                layer.msg("请填写投标内容");
                return false;
            }
            that.text("投标中...").addClass("disabled");
            if(task_id){
                $.post(_ERPHP_TASK.ajax, {
                        "action": "erphp_task_bid",
                        "task_id": task_id,
                        "bid_price": bid_price,
                        "bid_content": bid_content
                    }, function(result) {
                        if( result.status == 1 ){
                            layer.msg(result.msg); 
                            location.reload();
                        }else{
                            layer.msg(result.msg);
                            that.text("立即投标").removeClass("disabled");
                        }
                    }
                );
            }
        }
        return false;
    });

    $(".task-bid-win").click(function(){
        if(!$(this).hasClass('disabled')){
            var task_id = $(this).data("tid"),
                bid_id = $(this).data("bid"),
                that = $(this);

            that.text("处理中...").addClass("disabled");
            if(task_id && bid_id){
                $.post(_ERPHP_TASK.ajax, {
                        "action": "erphp_task_win",
                        "task_id": task_id,
                        "bid_id": bid_id
                    }, function(result) {
                        if( result.status == 1 ){
                            layer.msg(result.msg); 
                            location.reload();
                        }else{
                            layer.msg(result.msg);
                            that.text("选为中标").removeClass("disabled");
                        }
                    }
                );
            }
        }
        return false;
    });

    $(".task-bid-lose").click(function(){
        if(!$(this).hasClass('disabled')){
            var task_id = $(this).data("tid"),
                bid_id = $(this).data("bid"),
                that = $(this);

            that.text("处理中...").addClass("disabled");
            if(task_id && bid_id){
                $.post(_ERPHP_TASK.ajax, {
                        "action": "erphp_task_lose",
                        "task_id": task_id,
                        "bid_id": bid_id
                    }, function(result) {
                        if( result.status == 1 ){
                            layer.msg(result.msg); 
                            location.reload();
                        }else{
                            layer.msg(result.msg);
                            that.text("取消中标").removeClass("disabled");
                        }
                    }
                );
            }
        }
        return false;
    });

    $(".erphp-task-done").click(function(){
        if(!$(this).hasClass('disabled')){
            var task_id = $(this).data("id"),
                that = $(this);
            layer.open({
                title: '提示',
                content: '确认已验收？验收后此任务即完成～',
                yes: function(index, layero){
                    layer.close(index);
                    that.text("处理中...").addClass("disabled");
                    if(task_id){
                        $.post(_ERPHP_TASK.ajax, {
                                "action": "erphp_task_done",
                                "task_id": task_id
                            }, function(result) {
                                if( result.status == 1 ){
                                    layer.msg(result.msg); 
                                    location.reload();
                                }else{
                                    layer.msg(result.msg);
                                    that.text("任务完成").removeClass("disabled");
                                }
                            }
                        );
                    }
                }
            });
        }
        return false;
    });

});

function addZero(i) {
  return i < 10 ? "0" + i: i + "";
}

function timerDown() {
    var nowtime = new Date();
    //var endtime = new Date("2020/06/16,17:57:00");
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    var d = parseInt(lefttime / (24*60*60))
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    d = addZero(d)
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    document.querySelector("#task-timer").innerHTML = `${d} 天 ${h} 时 ${m} 分 ${s} 秒`;
    if (lefttime <= 0) {
        document.querySelector("#task-timer").innerHTML = "任务已结束";
        return;
    }
    setTimeout(timerDown, 1000);
}