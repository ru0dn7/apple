/* eslint-disable */

import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
// import Detail from "./routes/Detail.js";
// import Cart from "./routes/Cart.js";
import { useQuery } from "react-query";

// lazy import - 사이트 발행시 별도의 js파일로 분리됨
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

function App() {
  let [shoes, setShoes] = useState(data); // json 데이터
  let [clickCount, setClickCount] = useState(0); // 더보기 cnt
  let [loading, setLoading] = useState(false); // 로딩 상태
  let [재고] = useState([10, 11, 12]);

  let navigate = useNavigate();

  let result = useQuery("작명", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto ">
            <div>
              {result.isLoading && "로딩중"}
              {result.error && "에러남"}
              {result.data && result.data.name}
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중입니다</div>}>
        <Routes>
          {/* 메인페이지 */}
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>

                <div className="container">
                  <div className="row">
                    {shoes.map(function (a, i) {
                      return <Card shoes={shoes[i]} i={i} key={i} />;
                    })}
                  </div>
                </div>

                {/* 로딩 중일 때 스피너 */}
                {loading && (
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                )}

                {/* 버튼은 2번까지 표시 */}
                {clickCount < 2 && !loading && (
                  <button
                    onClick={() => {
                      let url = "";
                      if (clickCount === 0) {
                        url = "https://codingapple1.github.io/shop/data2.json";
                      } else if (clickCount === 1) {
                        url = "https://codingapple1.github.io/shop/data3.json";
                      }

                      setLoading(true); // 로딩 시작
                      axios
                        .get(url)
                        .then((결과) => {
                          let copy = [...shoes, ...결과.data];

                          // 로딩 끝을 1.5초 뒤로 미룸
                          setTimeout(() => {
                            setShoes(copy);

                            setClickCount(clickCount + 1);
                            // setLoading(false); // 로딩 끝

                            setLoading(false);
                          }, 1000);
                        })
                        .catch(() => {
                          console.log("데이터를 불러오는 중 오류 발생");
                          setLoading(false); // 로딩 끝
                        });
                    }}
                  >
                    더보기
                  </button>
                )}
              </>
            }
          />
          {/* 상세페이지 */}
          <Route path="detail/:id" element={<Detail shoes={shoes} />} />

          {/* 장바구니 페이지 */}
          <Route path="/cart" element={<Cart />} />

          {/* about 페이지 */}
          <Route path="about" element={<About />}>
            <Route path="member" element={<div>멤버 입니다</div>} />
            <Route path="location" element={<div>위지정보 입니다</div>} />
          </Route>
          <Route path="event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 1,000원 할인</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>

          {/* 404페이지 */}
          <Route path="*" element={<div>없는페이지입니다</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보 페이지 입니다</h4>
      <Outlet />
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>이벤트 페이지 입니다</h4>
      <Outlet />
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        alt=""
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
