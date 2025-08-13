/* eslint-disable */
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js";
import { addCount } from "./../store.js";
import { useState } from "react";


function Cart() {
  // state -> store안에 있는 모든 state, 원하는 것만 가져다 쓸 수도 있음
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  let [count, setcount] = useState(0)

  return (
    <div>
      <h6>
        {state.user.name}
        {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        버튼
      </button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <button
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
