import React from 'react';
/* import PropTypes from 'prop-types'; */
import s from './HomePage.scss';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: true,
		};
	}

	componentDidMount() {
		// init();
	}

	render() {
		const advancedSearchText = 'Arroz';

		return (
			<div>
				<div className={`container-fluid ${s.splash}`}>
					<div className="row">
						<div className={`container ${s.splash__content} text-center`}>
							<div className={this.state.content ? `${s.content} ${s.contentOpen}` : `${s.content} ${s.contentClosed}`}>
								<p>{advancedSearchText}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/* HomePage.propTypes = {
    dictionary: PropTypes.objectOf(PropTypes.string),
};

HomePage.defaultProps = {
    dictionary: {},
}; */

export default HomePage;
