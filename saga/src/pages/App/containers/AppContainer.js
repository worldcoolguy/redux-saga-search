import { connect } from 'react-redux';
import App from '../components/App';

import { fetchGit } from '../modules/actions';

export default connect(
  ({ app }) => ({ ...app}),
  (dispatch) => ({
    fetchGit: (options) => dispatch(fetchGit(options)),
  }),
)(App);
