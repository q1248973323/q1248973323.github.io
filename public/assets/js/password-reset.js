// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit',function(){
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    console.log(formData);
    
    // 调用接口 实现密码修改功能
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(){
            alert('修改成功，请重新登陆');

            location.href = "/admin/login.html"
        },
        error:function(err){
            alert(err.responseText);
            
        }
    })
    // 阻止表单默认提交的行为
    return false;
})