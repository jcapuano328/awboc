'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Text, Image } = React;
var IconButton = require('./iconButton');
var Icons = require('../resources/icons');

var ListItemView = React.createClass({
    getInitialState() {
        return {
            name: this.props.item.name,
            location: this.props.item.location,
            status: this.props.item.status,
            favorite: this.props.item.favorite
        };
    },
    onStatus() {
        var s = this.state.status == 'open' ? 'complete' : 'open';
        this.props.item.status = s;
        this.setState({status: s});
        this.props.onChanged && this.props.onChanged(this.props.item);
    },
    onFavorite() {
        var f = this.state.favorite ? false : true;
        this.props.item.favorite = f;
        this.setState({favorite: f});
        this.props.onChanged && this.props.onChanged(this.props.item);
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
                <IconButton image={this.state.status} onPress={this.onStatus}/>
                <TouchableOpacity style={{flex: 2}} onPress={this.props.onSelected}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left',marginLeft: 20}}>{this.state.name}</Text>
                        <Text style={{fontSize: 15,textAlign: 'left',marginLeft: 20}}>{this.state.location}</Text>
                    </View>
                </TouchableOpacity>
                <IconButton image={'select'} onPress={this.props.onSelected} />
                <IconButton image={this.state.favorite ? 'favorite' : 'favorite-off'} onPress={this.onFavorite} />
                <IconButton image={'remove'} onPress={this.props.onRemove} />
            </View>
        );
    }
});

module.exports = ListItemView;
