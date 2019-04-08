/* eslint import/prefer-default-export: "off" */

import axios from 'axios';
import { FRONTEND_URL } from '../../constants/config';
import * as types from '../../constants/ActionTypes';

export function retrieveUsergit(userName) {
	const url = `${FRONTEND_URL}/${userName}`;
	const req = axios.get(url);

	return {
		type: types.GET_GITUSER,
		payload: req,
	};
}
