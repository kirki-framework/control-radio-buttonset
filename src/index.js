import MyControlControl from './MyControlControl';

// Register control type with Customizer.
wp.customize.controlConstructor[ 'my-control' ] = MyControlControl;
