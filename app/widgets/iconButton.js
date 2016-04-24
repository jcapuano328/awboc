'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Image } = React;
var Icons = require('../resources/icons');

var IconButton = React.createClass({
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    style={{marginLeft: 5, marginRight: 5, width: this.props.width || 32, height: this.props.height || 32, resizeMode: 'contain'}}
                    source={Icons[this.props.image]} />
            </TouchableOpacity>
        );
    }
});

module.exports = IconButton;
