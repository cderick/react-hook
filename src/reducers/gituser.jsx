import * as types from '../constants/ActionTypes';
import initialState from '../constants/InitialState';

export default function gituserReducer(state = initialState.getIn(['gituser']), action) {
    if (action.payload && action.payload.data) {
        switch (action.type) {
            case types.GET_GITUSER:
            console.log(action.payload.data);
                return state.set('entries', action.payload.data);
            default: return state;
        }
    } else if (action.payload && action.payload.data && !action.payload.data.IsSuccessful) {
        switch (action.type) {
            case types.GET_GITUSER:
                return state
                    .set('errors', action.payload.data.ErrorMessage);
            default: return state;
        }
    }
    return state;
}