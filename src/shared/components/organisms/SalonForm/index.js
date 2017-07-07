import { parse } from 'querystring';
import { compose, shouldUpdate } from 'recompose';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { asyncLoader } from 'redux-async-loader';
import { salonListSelector, routingSelector } from 'shared/redux/modules/reducer';
import {
  searchSalonList,
  searchMoreSalonList,
  clearSearchSalonList,
} from 'shared/redux/modules/salonList';
import SalonForm from './SalonForm';

const selector = createSelector(
  salonListSelector,
  (state) => state.routing.locationBeforeTransitions.query.keyword,
  (salonList, keyword) => ({
    ...salonList,
    shouldForceScroll: salonList.canGetPrev,
    initialValues: { keyword },
  }),
);

export default compose(
  asyncLoader(
    ({ location }, { dispatch, getState }) => {
      const state = getState();
      const action = routingSelector(state).locationBeforeTransitions.action;
      if (action === 'POP' && salonListSelector(state).loaded) {
        return Promise.resolve();
      }

      if (location.query && !location.query.keyword) {
        return dispatch(clearSearchSalonList());
      }

      const more = location.query.more;
      const keyword = location.query.keyword;
      const page = location.query.page;

      if (more) {
        return dispatch(searchMoreSalonList({ keyword, page }));
      }

      dispatch(clearSearchSalonList());
      return dispatch(searchSalonList({ keyword, page }));
    }
  ),
  connect(
    selector,
    (dispatch, ownProps) => ({
      onClickPrev: (page) => () => {
        const keyword = parse(window.location.search.substr(1)).keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page - 1}&more=true`));
      },

      onClickNext: (page) => () => {
        const keyword = parse(window.location.search.substr(1)).keyword;
        return dispatch(replace(`/salon?keyword=${keyword}&page=${page + 1}&more=true`));
      },

      // 今見てる window の中の要素でpageのURL位置を変える
      onInnerWindow: (element) => {
        const page = element.getAttribute('data-page');
        const query = parse(window.location.search.substr(1));
        const currentPage = query.page || '0';
        const keyword = query.keyword;
        if (page !== currentPage) {
          return void dispatch(replace(`/salon?keyword=${keyword}&page=${page}&more=true`));
        }
      },
    }),
  ),
  reduxForm({
    form: 'salon',

    // キーワード検索開始
    onSubmit({ keyword }, dispatch) {
      dispatch(push(`/salon?keyword=${keyword}`));
    },
  }),
  shouldUpdate((props, nextProps) => nextProps.loaded),
)(SalonForm);
