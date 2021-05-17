import React from "react";

export type Props = {
  // props の型定義
  isVisible: boolean;
  comments: { id: string, text: string }[];
  onChangeVisibility: Function;
  onClickGetComments: Function;
};

export default function Hello(props: Props) {
  const { isVisible, onChangeVisibility, comments, onClickGetComments } = props;

  return (
    <div>   
      {isVisible && comments.map(comment => <div key={comment.id}>{comment.text}</div>)}
      <button type="button" onClick={() => onClickGetComments()}>
        get comments
      </button>
      <button type="button" onClick={() => onChangeVisibility()}>
        {isVisible ? "hide" : "show"}
      </button>
    </div>
  );
}
