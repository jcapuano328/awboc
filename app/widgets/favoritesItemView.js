'use strict';

var React = require('react-native');
var { View, Text, TouchableOpacity } = React;
var IconButton = require('./iconButton');

var FavoritesItemView = React.createClass({
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
                <TouchableOpacity style={{flex: 2}} onPress={this.props.onSelected}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left',marginLeft: 20}}>{this.props.favorite.name}</Text>
                        <Text style={{fontSize: 15,textAlign: 'left',marginLeft: 20}}>{this.props.favorite.location}</Text>
                    </View>
                </TouchableOpacity>
                <IconButton image={'remove'} onPress={this.props.onRemove} />
            </View>
        );
    }
});

module.exports = FavoritesItemView;
