import { steps } from "redux-effects-steps";
import { fetchrRead } from "redux-effects-fetchr";

/**
 * Action types
 */
const HELLO_CHANGE_VISIBILITY = "redux-pluto/hello/visibility/change"; // 表示・非表示を切り替える Action の type
const HELLO_GET_COMMENTS_REQUEST = "redux-pluto/hello/get/comments/request";
const HELLO_GET_COMMENTS_SUCCESS = "redux-pluto/hello/get/comments/success";
const HELLO_GET_COMMENTS_FAIL = "redux-pluto/hello/get/comments/fail";


type ChangeVisibility = {
  type: typeof HELLO_CHANGE_VISIBILITY;
};
type CommentsRequest = {
  type: typeof HELLO_GET_COMMENTS_REQUEST;
  payload: {
    resource: string;
  };
};
type CommentsSuccess = {
  type: typeof HELLO_GET_COMMENTS_SUCCESS;
  payload: any;
};
type CommentsFail = {
  type: typeof HELLO_GET_COMMENTS_FAIL;
  error: boolean;
};

type Action = ChangeVisibility
  | CommentsRequest
  | CommentsSuccess
  | CommentsFail;

/**
 * Action creators
 */
export function changeVisibility() {
  return {
    type: HELLO_CHANGE_VISIBILITY,
  };
}

export function getCommentsRequest(payload: {
  resource: string;
}): CommentsRequest {
  return {
    type: HELLO_GET_COMMENTS_REQUEST,
    payload,
  };
}
 
export function getCommentsSuccess(res: any) {
  return {
    type: HELLO_GET_COMMENTS_SUCCESS,
    payload: res,
  };
}
 
export function getCommentsFail() {
  return {
    type: HELLO_GET_COMMENTS_FAIL,
    error: true,
  };
}
 
export function getComments() {
  return steps(
    getCommentsRequest({ resource: "hello" }),
    ({ payload }) => fetchrRead(payload),
    [getCommentsSuccess, getCommentsFail],
  );
}

/**
 * Initial state
 */
// module 内で管理する state の型
export type State = {
  isVisible: boolean;
  comments: { id: string; text: string }[];
  loading: boolean;
  loaded: boolean;
  error?: boolean;
};

// store に展開される初期値
const INITIAL_STATE = {
  isVisible: true,
  comments: [],
  loading: true,
  loaded: false,
};

/**
 * Reducer
 */
export default function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case HELLO_CHANGE_VISIBILITY: {
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    }
    case HELLO_GET_COMMENTS_REQUEST: {
      return {
         ...state,
         loading: true,
         loaded: false,
      };
    }
    case HELLO_GET_COMMENTS_SUCCESS: {
      const {
        payload: {
          data: { comments },
        },
       } = action;
      return {
        ...state,
        comments,
        loading: false,
        loaded: true,
      };
    }
    case HELLO_GET_COMMENTS_FAIL: {
      const { error } = action;
      return {
        ...state,
        error,
        loading: false,
        loaded: false,
      };
    }
    default: {
      return state;
    }
  }
}
