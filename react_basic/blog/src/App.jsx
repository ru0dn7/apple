import { useState } from "react";
import "./App.css";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "리액트 공부",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy[0] = "여자 코트 추천";
          글제목변경(copy);
        }}
      >
        제목수정
      </button>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.sort();
          글제목변경(copy);
        }}
      >
        가나다순 정렬
      </button>
      {/* 글 생성 */}
      {글제목.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitle(i);
              }}
            >
              {글제목[i]}
              <span className="like"
                onClick={(e) => {
                  // e.stopPropagation(); 이벤트 버블링 막기
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy);
                }}
              >
                👍
              </span>
              {따봉[i]}
            </h4>
            <p>제목눌러 팝업열기</p>
            <button
              onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          입력값변경(e.target.value);
          // console.log(입력값);
        }}
      />
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경(copy);
        }}
      >
        글쓰기
      </button>

     

      {
        // html 중간에 조건문 쓸때 -> 삼항연산자 사용
        // 조건식 ? 참일때 코드 : 거짓일때 코드
        modal && (
          <Modal
            title={title}
            글제목={글제목}
            onClose={() => setModal(false)}
          />
        )
      }
    </div>
  );
}

// modal
// 다른 function 밖에 만들어야함, 첫 글자 대문자
function Modal(props) {
  return (
    <div className="modal-bg" onClick={props.onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h4>{props.글제목[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button>글 수정</button>
      </div>
    </div>
  );
}

export default App;
