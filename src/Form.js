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

	const getHash = ( input ) => {
		let hash = 0, len = input.length;
		for ( let i = 0; i < len; i++ ) {
			hash = ( ( hash << 5 ) - hash ) + input.charCodeAt( i );
			hash |= 0; // to 32bit integer.
		}
		hash = 0 > hash ? 0 - hash : hash;
		return hash;
	}

	// Get styles for label.
	const getLabelStyles = ( option ) => {

		let labelStyles = {
			display: 'block',
			border: '1px solid',
			borderColor: '#a0a5aa',
			padding: '6px 8px',
			margin: '0 3px 2px 0',
			borderRadius: '3px'
		}
		if ( isChecked( option ) ) {
			labelStyles.borderColor = '#00a0d2';
			labelStyles.boxShadow = 'inset 0 -2px 0 0 #00a0d2';
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
				flexWrap: 'wrap',
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
				<label
					key={ getHash( props.control.id + 'radio' + option ) }
					style={ getLabelStyles( option ) }
				>
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
