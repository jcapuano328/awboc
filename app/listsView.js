'use strict'

var React = require('react-native');
var { View, Image, Text } = React;
var TitleBar = require('./widgets/titleBar');
var Icons = require('./resources/icons');
var title = 'Aw? Boc!';

var ListsView = React.createClass({
    render() {
        return (
            //Icons.splash
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                <TitleBar logo={Icons.logo} title={title} onAbout={this.props.onAbout} onMenu={this.props.onMenu} />
                <Text>{'Show some lists here'}</Text>
            </View>
        );
    }
});

module.exports = ListsView;
