import { compose } from "redux";
import { connect } from "react-redux";
import { changeVisibility } from "../../../redux/modules/hello";
import { RootState } from "../../../redux/modules/reducer";
import Hello from "./Hello";

export default compose(
  connect(
    (state: RootState) => ({
      isVisible: state.app.hello.isVisible
    }),
    dispatch => ({
      onChangeVisibility: () => dispatch(changeVisibility())
    }),
  ),
)(Hello);
