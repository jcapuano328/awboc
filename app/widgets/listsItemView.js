'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Text, Image } = React;
var IconButton = require('./iconButton');
var Icons = require('../resources/icons');
var moment = require('moment');

var ListsItemView = React.createClass({
    onStatus() {
        let s = this.props.list.status == 'open' ? 'complete' : 'open';
        this.props.onChanged && this.props.onChanged('status', s);
    },
    render() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
                flexDirection: 'row',
                margin: 5,
                padding: 5,
                backgroundColor: '#eaeaea',
                //backgroundColor: 'gray',
                borderColor: 'gray',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 10
            }}>
                <IconButton image={this.props.list.status} onPress={this.onStatus}/>
                <TouchableOpacity style={{flex: 2}} onPress={this.props.onSelected}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left',marginLeft: 20}}>{this.props.list.name}</Text>
                        <Text style={{fontSize: 15,textAlign: 'left',marginLeft: 20}}>{moment(this.props.list.on).format('MMM DD, YYYY HH:mm')}</Text>
                    </View>
                </TouchableOpacity>
                <IconButton image={'select'} onPress={this.props.onSelected} />
                <IconButton image={'remove'} onPress={this.props.onRemove} />
            </View>
        );
    }
});

module.exports = ListsItemView;
