import React from 'react';
/* import PropTypes from 'prop-types'; */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveUsergit } from '../../actions';
import HomePage from '../../components/home/HomePage/HomePage';
import Loading from '../../components/generic/Loading/Loading';

class HomePageContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: true,
		};
	}

	componentWillMount() {
		// this.props.retrieveUsergit('cderick');
	}

	render() {
		if (this.state.loaded) {
			return <HomePage gituser="" />;
			// <HomePage gituser={this.props.gituser ? this.props.gituser.entries : ''} />
		}
		return <Loading />;
	}
}

/* HomePageContainer.propTypes = {
    retrieveUsergit: PropTypes.func.isRequired,
    gituser: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

HomePageContainer.defaultProps = {
    gituser: null,
}; */

function mapStateToProps(state) {
	return {
		gituser: state.get('gituser').toJS(),
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		retrieveUsergit,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
