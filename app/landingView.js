'use strict'

var React = require('react-native');
var { View, Image } = React;
var TitleBar = require('./widgets/titleBar');
var Icons = require('./resources/icons');
var title = 'Aw? Boc!';

var LandingView = React.createClass({
    render() {
        return (
            //Icons.splash
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                <TitleBar logo={Icons.logo} title={title} onAbout={this.props.onAbout} onMenu={this.props.onMenu} />
                <Image source={Icons.splash} style={{
                    flex: 1,
                    width: null,
                    height: null,
                    backgroundColor: 'transparent',
                }} />
            </View>
        );
    }
});

module.exports = LandingView;
