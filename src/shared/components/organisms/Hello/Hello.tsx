import React from "react";

export type Props = {
  // props の型定義
  isVisible: boolean;
  comments: { id: string, text: string }[];
  onChangeVisibility: Function;
};

export default function Hello(props: Props) {
  const { isVisible, onChangeVisibility, comments } = props;

  return (
    <div>   
      {isVisible && comments.map(comment => <div key={comment.id}>{comment.text}</div>)}
      <button type="button" onClick={() => onChangeVisibility()}>
        {isVisible ? "hide" : "show"}
      </button>
    </div>
  );
}
