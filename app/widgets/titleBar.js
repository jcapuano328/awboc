'use strict';

var React = require('react-native');
var { ToolbarAndroid, } = React;
var Icons = require('../resources/icons');

var TitleBar = React.createClass({
    render() {
        return (
            <ToolbarAndroid
                navIcon={Icons.menu}
                style={{backgroundColor: '#e9eaed',height: 64}}
                title={this.props.title}
                subtitle={this.props.subtitle}
                subtitleColor='blue'
                onIconClicked={this.props.onMenu}
            />
        );
    },
});

module.exports = TitleBar;
