// 버튼0 누르면 
// - 버튼?에 붙은 orange 클래스명 제거
// - 버튼0에 orange 클래스명 추가

// - 모든 div에 붙은 show 클래스명 제거
// - div0에  show 클래스명 추가

$('.tab-button').eq(0).on('click',function(){  
  $('.tab-button').removeClass('orange');
  $(this).addClass('orange');  

  $('.tab-content').removeClass('show');
  $('.tab-content').eq(0).addClass('show');
  console.log('1번누름');
});
$('.tab-button').eq(1).on('click',function(){  
  $('.tab-button').removeClass('orange');
  $(this).addClass('orange');  

  $('.tab-content').removeClass('show');
  $('.tab-content').eq(1).addClass('show');
  console.log('2번누름');
  
});
$('.tab-button').eq(2).on('click',function(){  
  $('.tab-button').removeClass('orange');
  $(this).addClass('orange');  

  $('.tab-content').removeClass('show');
  $('.tab-content').eq(2).addClass('show');
  console.log('3번누름');
});
