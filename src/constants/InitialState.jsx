import { fromJS } from 'immutable';

import * as userState from './UserStates';

const state = {
    gituser: {
        entries: null,
        errors: null,
        status: userState.USER_NOT_CHECKED,
    },
};

export default fromJS(state);
