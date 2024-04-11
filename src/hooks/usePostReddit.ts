import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../store/reducer";
import {postRequestAsync} from "../store/requestActions";

export interface IPostData {
  cards?: []
  after?: []
}

export function usePostReddit (bottomList: any, scrolling: boolean, btnLoading: any) {
  const data = useSelector<rootState, IPostData>(state => state.data.cards);
  const loading = useSelector<rootState, boolean>((state) => state.data.loading);
  const error = useSelector<rootState, string>((state) => state.data.error);
  const end = useSelector<rootState, boolean>((state) => state.data.end);
  const token = useSelector<rootState, any>((state) => state.token);
  let [isQtyLoading, setQtyLoading] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        if (!loading) {
          dispatch<any>(postRequestAsync(scrolling ?? false));
        }
        setQtyLoading(isQtyLoading++)
      }
    }, {
      rootMargin: '10px'
    })

    if (scrolling) {
      if ((isQtyLoading ?? 3) <= 3) {
        if (bottomList.current ) {
          observer.observe(bottomList.current);
        }

      } else {
        if (btnLoading.current) {
          btnLoading.current.addEventListener('click', (e: any) => {
            e.preventDefault();
            observer.observe(bottomList.current);
            setQtyLoading(isQtyLoading = 0);
          })
        }
      }
    } else {
      dispatch<any>(postRequestAsync(scrolling ?? false));
    }

    return () => {
      if (bottomList.current) {
        observer.unobserve(bottomList.current);
      }
    }

  }, [token, bottomList.current, isQtyLoading])
  return {data, loading, error, isQtyLoading, end};
}
