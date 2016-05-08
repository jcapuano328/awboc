'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Text, Image } = React;
var IconButton = require('./iconButton');
var Icons = require('../resources/icons');
var FavoritesStore = require('../stores/favorites');
var Subscribable = require('Subscribable');

var ListItemView = React.createClass({
    mixins: [Subscribable.Mixin],

    getInitialState() {
        return {
            name: this.props.item.name,
            location: this.props.item.location,
            status: this.props.item.status,
            favorite: this.props.item.favorite
        };
    },
    componentDidMount() {
        this.addListenerOn(this.props.events, 'itemchanged', (item, e) => {
            if (this.props.item == item && this.state.hasOwnProperty(e.name)) {
                console.log('^^^^^^^^^^ item ' + item.name + ' property ' + e.name + ' = ' + e.value);
                let state = {};
                state[e.name] = e.value;
                this.setState(state);
            }
        });
    },
    onStatus() {
        var s = this.state.status == 'open' ? 'complete' : 'open';
        this.props.item.status = s;
        this.setState({status: s});
        this.props.onChanged && this.props.onChanged('status', s);
    },
    onFavorite() {
        var f = this.state.favorite ? false : true;
        this.props.item.favorite = f;
        this.setState({favorite: f});
        this.props.onChanged && this.props.onChanged('favorite', f);
        if (f) {
            console.log('adding favorite ' + this.state.name);
            FavoritesStore.add(FavoritesStore.createNew(this.state.name, this.state.location))
            .then(() => {
                console.log('added favorite ' + this.state.name);
            })
            .catch((e) => {
                console.error(e);
            });
        } else {
            console.log('removing favorite ' + this.state.name);
            FavoritesStore.removeByKey(this.state.name, this.state.location)
            .then(() => {
                console.log('removed favorite ' + this.state.name);
            })
            .catch((e) => {
                console.error(e);
            });
        }
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
