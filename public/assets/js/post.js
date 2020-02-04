// 向服务器端发送请求 获取文章列表接口数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        var html = template('postsTpl',response);
        $('#postsBox').html(html);
        var page = template('pageTpl',response);
        $('#page').html(page)
    }
})

// 处理日期时间格式
function formateDate(date){
    // 将日期事件字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay();
}

// 分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page
        },
        success:function(response){
            var html = template('postsTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#page').html(page)
        }
    })
}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html = template('categoryTpl',{data:response});
        $('#categoryBox').html(html)
    }
})

// 当文章进行文章列表筛选的时候
$('#filterForm').on('submit',function(){
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(response){
            var html = template('postsTpl',response);
            $('#postsBox').html(html);
            var page = template('pageTpl',response);
            $('#page').html(page)
        }
    })
    // 获取文章列表
    return false
})

// 当删除按钮被点击的时候
$('#postsBox').on('click','.delete',function(){
    // 弹出删除确认框 和管理员确认是否真的要进行删除操作
    if(confirm('您真的要进行删除操作吗')){
        // 获取管理员要删除的文章的id 
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function(){
                location.reload()
                alert('删除成功')

            }
        })
    }
    return false
});