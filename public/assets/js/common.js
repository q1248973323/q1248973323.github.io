$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
      // alert('用户点击了确认按钮')
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'login.html';
        },
        error: function () {
          alert('退出失败')
        }
      })
    }
  });

  
function formateDate(date){
  // 将日期事件字符串转换为日期对象
  date = new Date(date);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay();
}
