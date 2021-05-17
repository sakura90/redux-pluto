import { compose } from "redux";
import { connect } from "react-redux";
import { asyncLoader } from "@recruit-tech/redux-async-loader"; // redux-asynch-roder から　asyncLoader　をインポート
import { reduxForm } from "redux-form";
import { changeVisibility, getComments, postComment } from "../../../redux/modules/hello";
import { RootState } from "../../../redux/modules/reducer";
import Hello from "./Hello";

const enhancer = compose(
  asyncLoader(({}, { dispatch }) => dispatch(getComments())),
  connect(
    (state: RootState) => ({
      isVisible: state.app.hello.isVisible,
      comments: state.app.hello.comments,
    }),
    dispatch => ({
      onChangeVisibility: () => dispatch(changeVisibility()),
    }),
  ),
  reduxForm({
    form: "hello",
    onSubmit(values: { text: string }, dispatch: any) {
      dispatch(postComment(values));
    },
  }),
);

export default enhancer(Hello);
