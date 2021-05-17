import { compose } from "redux";
import { connect } from "react-redux";
import { changeVisibility, getComments } from "../../../redux/modules/hello";
import { RootState } from "../../../redux/modules/reducer";
import Hello from "./Hello";

export default compose(
  connect(
    (state: RootState) => ({
      isVisible: state.app.hello.isVisible,
      comments: state.app.hello.comments,
    }),
    dispatch => ({
      onChangeVisibility: () => dispatch(changeVisibility()),
      onClickGetComments: () => dispatch(getComments() as any),
    }),
  ),
)(Hello);
