import { combineReducers } from 'redux-immutable';
import gituserReducer from './gituser';

const rootReducer = combineReducers({
	gituser: gituserReducer,
});

export default rootReducer;
