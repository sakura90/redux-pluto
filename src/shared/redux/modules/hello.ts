import { steps } from "redux-effects-steps";
import { fetchrRead, fetchrCreate } from "redux-effects-fetchr";

/**
 * Action types
 */
const HELLO_CHANGE_VISIBILITY = "redux-pluto/hello/visibility/change"; // 表示・非表示を切り替える Action の type
const HELLO_GET_COMMENTS_REQUEST = "redux-pluto/hello/get/comments/request";
const HELLO_GET_COMMENTS_SUCCESS = "redux-pluto/hello/get/comments/success";
const HELLO_GET_COMMENTS_FAIL = "redux-pluto/hello/get/comments/fail";
const HELLO_POST_COMMENT_REQUEST = "redux-pluto/hello/post/comments/request";
const HELLO_POST_COMMENT_SUCCESS = "redux-pluto/hello/post/comments/success";
const HELLO_POST_COMMENT_FAIL = "redux-pluto/hello/post/comments/fail";

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

type PostCommentRequest = {
  type: typeof HELLO_POST_COMMENT_REQUEST;
  payload: {
    resource: string;
    body: {
      text: string;
    };
  };
};
type PostCommentSuccess = {
  type: typeof HELLO_POST_COMMENT_SUCCESS;
  payload: {
    data: {
      id: string;
      text: string;
    };
  };
};
type PostCommentFail = {
  type: typeof HELLO_POST_COMMENT_FAIL;
  error: boolean;
};


type Action = ChangeVisibility
  | CommentsRequest
  | CommentsSuccess
  | CommentsFail
  | PostCommentRequest
  | PostCommentSuccess
  | PostCommentFail;

/**
 * Action creators
 */
export function changeVisibility() {
  return {
    type: HELLO_CHANGE_VISIBILITY,
  };
}

export function getCommentsRequest(): CommentsRequest {
  return {
    type: HELLO_GET_COMMENTS_REQUEST
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
    getCommentsRequest(),
    fetchrRead({
      resource: "hello",
    }) as any,
    [getCommentsSuccess, getCommentsFail],
  );
}

export function postCommentRequest(payload: {
  resource: string;
  body: { text: string };
}): PostCommentRequest {
  return {
    type: HELLO_POST_COMMENT_REQUEST,
    payload,
  };
}

export function postCommentSuccess(payload: {
  data: { id: string; text: string };
}): PostCommentSuccess {
  return {
    type: HELLO_POST_COMMENT_SUCCESS,
    payload,
  };
}

export function postCommentFail(): PostCommentFail {
  return {
    type: HELLO_POST_COMMENT_FAIL,
    error: true,
  };
}

export function postComment(body: { text: string }) {
  return steps(
    postCommentRequest({ resource: "hello", body }),
    ({ payload }) => fetchrCreate(payload),
    [postCommentSuccess, postCommentFail],
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
    case HELLO_POST_COMMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case HELLO_POST_COMMENT_SUCCESS: {
      const {
        data: { id, text },
      } = action.payload;
      return {
        ...state,
        comments: [...state.comments, { id, text }],
        loading: false,
        loaded: true,
      };
    }
    case HELLO_POST_COMMENT_FAIL: {
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
