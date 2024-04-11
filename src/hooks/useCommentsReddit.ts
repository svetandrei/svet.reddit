import {useLayoutEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {rootState} from "../store/reducer";

interface ICommentData {
  commentList?: [];
}

export function useCommentsReddit (post: {} | any) {
  const [data, setData] = useState<ICommentData>({});
  const token = useSelector<rootState, any>((state) => state.token);

  useLayoutEffect(() => {
    if (token) {
      axios.get(`https://oauth.reddit.com/r/${post?.subreddit}/comments/${post?.id}/?sr_detail=true`, {
        headers: {Authorization: `bearer ${token}`}
      }).then((res) => {
        setData({commentList: res.data[1].data.children})
      })
        .catch(console.log)
    }
  }, [token])
  return [data];
}
