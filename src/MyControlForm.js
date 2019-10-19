/* globals React */
/* eslint jsx-a11y/label-has-for: off */
const MyControlForm = ( props ) => {

	// Styles.
	const styles = reactCSS( {
		default: {
			controlHead: {},
		}
	} );

	return (
		<div>
			<div style={ styles.controlHead }>
				<label id={ 'label-' + props.customizerSetting.id } className="customize-control-title">{ props.label }</label>
				<span className="description customize-control-description" dangerouslySetInnerHTML={ { __html: props.description } }></span>
				<div className="customize-control-notifications-container" ref={ props.setNotificationContainer }></div>
			</div>

			<Foo { ...props } />
		</div>
	);
};

export default MyControlForm;
