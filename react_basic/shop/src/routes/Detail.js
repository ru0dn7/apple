import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

function Detail(props) {
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  let YllowBtn = styled.button`
    background: ${(props) => props.bg};
    color: ${(props) => (props.bg == "skyblue" ? "white" : "black")};
    padding: 10px;
  `;
  let [count, setcount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);

  // mount,update 시 실행된다
  // 서버에서 데이터가져오기, 어려운 연산,타이머 장착 등 할때 사용
  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              찾은상품.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent 탭={탭}/>
    </div>
  );
}

function TabContent({탭}) {
  if (탭 == 0) {
    return <div>내용0내용0내용0내용0</div>;
  }
  if (탭 == 1) {
    return <div>내용1내용1내용1내용1내용1</div>;
  }
  if (탭 == 2) {
    return <div>내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2</div>;
  }
}
export default Detail;
