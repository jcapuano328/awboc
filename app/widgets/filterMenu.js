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
                    <MenuOption value={'today'}><Text style={{fontSize: 20}}>Today</Text></MenuOption>
                    <MenuOption value={'yesterday'}><Text style={{fontSize: 20}}>Yesterday</Text></MenuOption>
                    <MenuOption value={'all'}><Text style={{fontSize: 20}}>All</Text></MenuOption>                
                </MenuOptions>
            </Menu>
        );
        /*
        {[{text:'Today',value:'today'},{text:'Yesterday',value:'yesterday'},{text:'All',value:'all'}].map((o,i) => {
            <MenuOption key={i} value={o.value}><Text style={{fontSize: 20}}>{o.text}</Text></MenuOption>
        })}
        */
    }
});

module.exports = FilterMenu;
