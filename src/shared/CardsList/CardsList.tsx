import React, {useRef} from 'react';
import './cardslist.css';
import {Card} from "./Card";
import {usePostReddit} from "../../hooks/usePostReddit";
import {Outlet, useParams} from "react-router-dom";
import {detailObj} from "../../store/reducer";
import {useDispatch} from "react-redux";

export function CardsList() {
  const bottomList = useRef<HTMLDivElement>(null)
  const btnLoading = useRef<HTMLButtonElement>(null)
  const {data: {cards}, loading, error, isQtyLoading, end} = usePostReddit(bottomList, true, btnLoading)

  const params = useParams()
  const dispatch = useDispatch();
  if (params.id) {
    let detObj = cards?.filter((item) => {
      // @ts-ignore
      return item?.data.id === params.id
    })
    // @ts-ignore
    dispatch(detailObj(detObj[0]?.data));
  }

  return (
    <>
    <ul className="cards-list">
      {cards?.length === 0 && !loading && !error && (<div>Нет ни одной записи</div>) }

      {cards?.map((item: any, key) => (
        <Card id={item.data.id} key={item.data.id} item={item.data}/>
      ))}

      <div ref={bottomList} />

      {loading && (
        <div className="pre-loader">
          <div className="pre-container">
          </div>
          <div className='pre-ball-one'>
          </div>
          <div className='pre-ball-two'>
          </div>
          <div className='pre-ball-three'>
          </div>
        </div>)}

      {error && (
        <div className="" role="alert" style={{textAlign:'center'}}>{error}</div>
      )}

      {isQtyLoading == 4 && (
        <button className="btn-loader" ref={btnLoading} style={!end && isQtyLoading == 4 ? {display: 'none'} : {textAlign:'center'}}>Загрузить ещё</button>
      )}
    </ul>
      <Outlet/>
    </>
  );
}
