function clearInput() {
  document.querySelector(".search").value = "";
  renderList(productData); // ← 검색어 초기화 후 전체 목록 다시 출력
}

// 상품 목록(JSON) 불러와 출력
let productData = [];

// 상품 목록 출력 함수
function renderList(data) {
  let keyword = $(".search").val().toLowerCase(); // 검색어 가져오기
  let alltHTML = "";

  if (data.length == 0) {
    alltHTML = `<li style="width:100%; height: 340px; display: flex; justify-content: center; align-items: center; font-size: 1.5em;">
      검색 결과가 없습니다.
    </li>`;
  } else {
    data.forEach((product) => {
      let highlightedTitle = product.title;

      // 상품이름과 검색어 일치하면 글자에 mark표시
      if (keyword) {
        let reg = new RegExp(`(${keyword})`, "gi");
        highlightedTitle = product.title.replace(reg, `<mark>$1</mark>`);
      }

      alltHTML += `
        <li>
          <img src="./${product.photo}" alt="${product.title}" />
          <ul>
            <li class="title">${highlightedTitle}</li>
            <li class="made">${product.brand}</li>
            <li class="price">가격 : ${product.price}</li>
          </ul>
          <button>담기</button>
        </li>`;
    });
  }
  $(".list_wrap").html(alltHTML);
}


// JSON 불러오기
$.getJSON("./store.json", function (data) {
  productData = data.products;
  renderList(productData); // 처음에는 전체 리스트 보여주기
});

// 검색 기능
$(".search").on("input", function () {
  let keyword = $(this).val().toLowerCase();
  let result = productData.filter((item) =>
    item.title.toLowerCase().includes(keyword)
  );
  renderList(result); // 필터된 목록 출력
});

// 장바구니에 담기
// 장바구니에 담기는 상품을 저장할 배열
let cart = [];

$(document).on("click", ".list_wrap li button", function () {
  const index = $(this).closest("li").index();
  const item = $(".search").val()
    ? productData.filter((p) =>
        p.title.toLowerCase().includes($(".search").val().toLowerCase())
      )[index]
    : productData[index];

  cart.push(item);
});

// 드래그 앤 드롭
$(document).on("mousedown", ".list_wrap li", function (e) {
  $(this).attr("draggable", "true");
});

$(document).on("dragstart", ".list_wrap li", function (e) {
  const index = $(this).index();
  const item = $(".search").val()
    ? productData.filter((p) =>
        p.title.toLowerCase().includes($(".search").val().toLowerCase())
      )[index]
    : productData[index];

  e.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(item));
});

// 장바구니의 상품 삭제
$(document).on("click", ".remove", function () {
  const id = $(this).closest("li").data("id");
  delete cartItems[id];
  $(this).closest("li").remove();
  updateTotalPrice();
});

// 합계 가격계산
function updateTotalPrice() {
  let total = 0;

  for (let key in cartItems) {
    const item = cartItems[key]; //상품의 개수
    const price = parseInt(item.price.toString().replace(/[^0-9]/g, "")); // 상품의 가격
    total += price * item.count;
  }

  $(".total_price span").text(total.toLocaleString());
}

// 장바구니에 상품 생성
let cartItems = {};

function addToCart(product) {
  const productId = product.title;

  if (cartItems[productId]) {
    cartItems[productId].count++;
    $(`.cart_list li[data-id="${productId}"] .count`).text(
      `${cartItems[productId].count}개`
    );
  } else {
    cartItems[productId] = { ...product, count: 1 };
    $(".cart_list").append(`
      <li class="product-card" data-id="${productId}">
        <img src="./${product.photo}" alt="${product.title}" />
        <ul>
          <li class="title">${product.title}</li>
          <li class="made">${product.brand}</li>
          <li class="price">가격 : ${product.price}</li>
        </ul>
         <span class="controls">
         <button class="minus">-</button>
         <span class="count">1개</span>
         <button class="plus">+</button>
              </span>
        <button class="remove">✖</button>

      </li>
    `);
  }

  // 합계가격 업데이트
  updateTotalPrice();
}

$(".cart")
  .on("dragover", function (e) {
    e.preventDefault();
  })
  .on("drop", function (e) {
    e.preventDefault();
    const droppedData = JSON.parse(
      e.originalEvent.dataTransfer.getData("text/plain")
    );
    addToCart(droppedData);
  });

$(".list_wrap").on("click", "button", function () {
  const index = $(this).closest("li").index();
  const keyword = $(".search").val().toLowerCase();
  const filtered = productData.filter((p) =>
    p.title.toLowerCase().includes(keyword)
  );
  const item = keyword ? filtered[index] : productData[index];

  addToCart(item);
});

// +로 수량 증가
$(document).on("click", ".plus", function () {
  const li = $(this).closest("li");
  const id = li.data("id");

  if (!cartItems[id]) {
    console.warn("cartItems에 해당 ID가 없음");
    return;
  }

  cartItems[id].count++;
  li.find(".count").text(`${cartItems[id].count}개`);
  updateTotalPrice();
});
// -로 수량 감소
$(document).on("click", ".minus", function () {
  const li = $(this).closest("li");
  const id = li.data("id");

  if (!cartItems[id]) return;

  // 수량이 1보다 크면 감소
  if (cartItems[id].count > 1) {
    cartItems[id].count--;
    li.find(".count").text(`${cartItems[id].count}개`);
  } else {
    // 수량이 1인데 -를 누르면 삭제
    delete cartItems[id];
    li.remove();
  }

  updateTotalPrice();
});

// 구매하기 -> 모달창 열기/닫기
$(".buy").on("click", function () {
  $(".modal_bg").addClass("on");
});
$(".btn_box .close").on("click", function () {
  $(".modal_bg").removeClass("on");
});

$(".info").on("click", function () {
  //영수증 창 열기
  $(".bill").addClass("on");

  // 최신 날짜/시간 구하기
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;

  var hours = ("0" + today.getHours()).slice(-2);
  var minutes = ("0" + today.getMinutes()).slice(-2);
  var seconds = ("0" + today.getSeconds()).slice(-2);
  var timeString = hours + ":" + minutes + ":" + seconds;

  // 최신 input 값 가져오기
  var name = $(".modal input").eq(0).val();
  var phone = $(".modal input").eq(1).val();

  // 합계 금액 계산
  let total = 0;
  for (let key in cartItems) {
    const item = cartItems[key];
    const price = parseInt(item.price.toString().replace(/[^0-9]/g, ""));
    total += price * item.count;
  }

  // canvas 그리기
  var canvas = document.querySelector("#canvas");
  var c = canvas.getContext("2d");

  c.clearRect(0, 0, canvas.width, canvas.height); // 지우고 새로 그리기

  c.font = "20px dotum";
  c.fillText("영수증", 30, 30);
  c.fillText(`${dateString} ${timeString}`, 30, 60);
  c.fillText(`구매자 : ${name}`, 30, 120);
  c.fillText(`연락처 : ${phone}`, 30, 150);
  c.fillText(`합계 : ${total.toLocaleString()}원`, 30, 180);
});

$(".close").on("click", function () {
  // 모달창 또는 영수증 닫기
  $(".modal_bg, .bill").removeClass("on");

  $(".modal input").val("");
});
