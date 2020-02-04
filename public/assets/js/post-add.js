// 向服务器端发送请求 获取文章分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(response){
        var html = template('selectTpl',{data:response});
        $('#category').html(html)
    }
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change',function(){
    // 获取到管理员选择到的文件
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover',file)
    // 实现文章封面图片上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData:false,
        // 不要设置参数类型
        contentType:false,
        success:function(response){
            console.log(response);
            $('#thumbnail').val(response[0].cover)
        }
    })
})

$('#addForm').on('submit',function(){
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(response){
            // 文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'            
        }
    })
    return false;
})
// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
if(id != -1){
    // 根据id获取文章的详细信息
    $.ajax({
        type:'get',
        url:'/posts/'+id,
        success:function(response){
            console.log(response);
            
            $.ajax({
                url:'/categories',
                type:'get',
                success:function(categories){
                    response.categories = categories
                    console.log(response);
                    var html = template('modifyTpl',response);
                    $('#parentBox').html(html);
                    
                }
            })
        }
    })
}
// 从浏览器的地址栏中获取查询参数
function getUrlParams(name){
    
    var paramsAry = location.search.substr(1).split('&')
    for(var i=0;i<paramsAry.length;i++){
        var tmp = paramsAry[i].split('=')
      if(tmp[0] == name){
          return tmp[1];
      }
    }
    return -1
}

// 当修改文章信息表单发送提交行为的时候
$('#parentBox').on('submit','#modifyForm',function(){
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:formData,
        success:function( ){
            location.href = '/admin/posts.html'
        }

    })
    return false;
})