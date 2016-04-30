'use strict';

var React = require('react-native');
var { View, Image, Text } = React;
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
var Icons = require('../resources/icons');

var FilterMenu = React.createClass({
    render() {
        return (
            <Menu onSelect={this.props.onSelect}>
                <MenuTrigger>
                    {this.props.image
                        ? <Image style={{marginLeft: 5, marginRight: 5, width: this.props.width || 32, height: this.props.height || 32, resizeMode: this.props.resizeMode || 'contain'}} source={Icons[this.props.image]} />
                        : <Text style={{ fontSize: 20 }}>&#8942;</Text>
                    }
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption value={'today'}><Text>Today</Text></MenuOption>
                    <MenuOption value={'yesterday'}><Text>Yesterday</Text></MenuOption>
                    <MenuOption value={'all'}><Text>All</Text></MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
});

module.exports = FilterMenu;
