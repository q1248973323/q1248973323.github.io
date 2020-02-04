// 向服务器端发送请求 获取评论列表数据
$.ajax({
    type:'get',
    url:'/comments',
    success:function(response){
        var html = template('commentsTpl',response);
        $('#commentsBox').html(html);
        var page = template('pageTpl',response);
        console.log(response);
        
        $('#pageBox').html(page);
     }
})

// 实现分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page
        },
        success:function(response){
            var html = template('commentsTpl',response);
            $('#commentsBox').html(html);
            var page = template('pageTpl',response);
            console.log(response);
            
            $('#pageBox').html(page);
         }
    })
}

// 
$('#commentsBox').on('click','.status',function(){
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:status ==0 ? 1:0
        },
        success:function(response){
            console.log(response);
            location.reload()
        }
    })    
    
})

$('#commentsBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    if(confirm('您确定要删除该评论吗')){
        $.ajax({
            type:'delete',
            url:'/comments/'+id,
            success:function(response){
                console.log(response);
                location.reload();
            }
        })
    }
})
