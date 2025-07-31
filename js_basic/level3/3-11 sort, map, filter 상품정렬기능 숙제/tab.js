// 버튼0 누르면
// - 버튼?에 붙은 orange 클래스명 제거
// - 버튼0에 orange 클래스명 추가

// - 모든 div에 붙은 show 클래스명 제거
// - div0에  show 클래스명 추가

// $('.tab-button').eq(0).on('click',function(){
//   $('.tab-button').removeClass('orange');
//   $(this).addClass('orange');

//   $('.tab-content').removeClass('show');
//   $('.tab-content').eq(0).addClass('show');
//   console.log('1번누름');
// });

// $('.tab-button').eq(1).on('click',function(){
//   $('.tab-button').removeClass('orange');
//   $(this).addClass('orange');

//   $('.tab-content').removeClass('show');
//   $('.tab-content').eq(1).addClass('show');
//   console.log('2번누름');

// });

// // tip - 자주쓰는 셀렉터 변수에 넣어서 사용
// var 버튼 = $('.tab-button');

// 버튼.eq(2).on('click',function(){
//   버튼.removeClass('orange');
//   $(this).addClass('orange');

//   $('.tab-content').removeClass('show');
//   $('.tab-content').eq(2).addClass('show');
//   console.log('3번누름');
// });

// --------------------------------
// for (var i = 0; i < 3; i++) {
//   console.log("안녕");
// }

// --------------------------------
// for문 탭기능에 적용, 
// 숙제 - 탭의 개수가 늘어나면??? -> 확장성 고려한 코드로 바꿔보기

var tabCnt = $(".tab-button").length;

for (let i = 0; i < tabCnt; i++) {  // var가 아닌 let으로 써야함!!
  $(".tab-button").eq(i).on("click", function () {
      $(".tab-button").removeClass("orange");
      $(this).addClass("orange");

      $(".tab-content").removeClass("show");
      $(".tab-content").eq(i).addClass("show");
      // console.log("1번누름");
    });
}
