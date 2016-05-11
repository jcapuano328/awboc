'use strict'

var React = require('react-native');
var { View, ScrollView, Text, Alert } = React;
var Icons = require('./resources/icons');
var FavoritesItemView = require('./widgets/favoritesItemView');
var FavoritesStore = require('./stores/favorites');

var FavoritesView = React.createClass({
    getInitialState() {
        return {
            favorites: []
        };
    },
    componentWillMount() {
        //console.log('set initial route');
        FavoritesStore.select()
        .then((data) => {
            //console.log(data);
            this.setState({favorites: data});
        })
        .done();
    },
    onSelected(favorite) {
        return () => {
            this.props.onSelected && this.props.onSelected(favorite);
        }
    },
    onRemove(favorite) {
        return () => {
            Alert.alert('Remove Favorite?', 'The item will be permanently removed', [
                {text: 'No', style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    console.log('*********** remove favorite ' + favorite.name + ' / ' + favorite.location);
                    var idx = this.state.favorites.indexOf(favorite);
                    if (idx > -1) {
                        this.state.favorites.splice(idx, 1);
                        this.setState({favorites: this.state.favorites});
                        FavoritesStore.remove(favorite)
                        .then(() => {
                            console.log('favorite removed');
                        })
                        .catch((ex) => {
                            console.error(ex);
                        });                        
                    }
                }}
            ]);
        }
    },
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: 10,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                {this.state.favorites.length > 0
                    ? (
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}
                            style={{flex: 1,backgroundColor: 'transparent'}}>
                            {this.state.favorites.map((favorite, i) => {
                                return (
                                    <View key={i} style={{flex: 1}}>
                                        <FavoritesItemView key={i} favorite={favorite} onSelected={this.onSelected(favorite)} onRemove={this.onRemove(favorite)} />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )
                    : (
                        <View style={{flex:1, marginTop: 250, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>No Favorites</Text>
                        </View>
                    )
                }
            </View>
        );
    }
});

module.exports = FavoritesView;
