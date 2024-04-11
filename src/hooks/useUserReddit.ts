import {useEffect} from "react";
import {rootState} from "../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import {userRequestAsync} from "../store/requestActions";

export interface IUserData {
  name?: string,
  avatar?: string
}

export function useUserReddit() {
  const data = useSelector<rootState, IUserData>(state => state.data.user);
  const token = useSelector<rootState, string>((state) => state.token);
  const loading = useSelector<rootState, boolean>((state) => state.data.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch<any>(userRequestAsync());
  }, [token])
  return {data, loading};
}
