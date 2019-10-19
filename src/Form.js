/* globals React */
/* eslint jsx-a11y/label-has-for: off */

import reactCSS from 'reactcss';

const RadioButtonsetForm = ( props ) => {

	const handleChange = ( e ) => {
		wp.customize( props.customizerSetting.id ).set( e.currentTarget.value );
	};

	const isChecked = ( option ) => {
		return option === wp.customize( props.customizerSetting.id ).get();
	};

	// Get styles for label.
	const getLabelStyles = ( option ) => {

		let labelStyles = {
			display: 'block',
			border: '1px solid',
			'border-color': '#a0a5aa',
			padding: '6px 8px',
			'margin': '0 3px 2px 0',
			'border-radius': '3px'
		}
		if ( isChecked( option ) ) {
			labelStyles['border-color'] = '#00a0d2';
			labelStyles['box-shadow'] = 'inset 0 -2px 0 0 #00a0d2';
		}

		const styles = reactCSS( {
			default: {
				label: labelStyles
			},
		} );
		return styles.label;
	};

	// Styles.
	const styles = reactCSS( {
		default: {
			buttonsetWrapper: {
				display: 'flex',
				'flex-wrap': 'wrap',
			},

			input: {
				display: props.hideInput ? 'none' : 'inline-block'
			}
		}
	} );

	const renderRadios = () => {
		const radios = [];
		Object.keys( props.choices ).map( function( option ) {
			radios.push(
				<label style={ getLabelStyles( option ) }>
					<input
						type="radio"
						value={ option }
						checked={ isChecked( option ) }
						onChange={ handleChange }
						style={ styles.input }
					/>
					<span dangerouslySetInnerHTML={ { __html: props.choices[ option ] } }></span>
				</label>
			);
		} );
		return <div style={ styles.buttonsetWrapper }>{ radios }</div>
	}

	return (
		<div>
			<div style={ styles.controlHead }>
				<label id={ 'label-' + props.customizerSetting.id } className="customize-control-title">{ props.label }</label>
				<span className="description customize-control-description" dangerouslySetInnerHTML={ { __html: props.description } }></span>
				<div className="customize-control-notifications-container" ref={ props.setNotificationContainer }></div>
			</div>
			<div>{ renderRadios() }</div>
		</div>
	);
};

export default RadioButtonsetForm;
