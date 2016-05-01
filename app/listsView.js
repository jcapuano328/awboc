'use strict'

var React = require('react-native');
var { View, ScrollView, Text } = React;
var Icons = require('./resources/icons');
var ListsItemView = require('./widgets/listsItemView');

var ListsView = React.createClass({
    onSelected(list) {
        return () => {
            this.props.onSelected && this.props.onSelected(list);
        }
    },
    onStatus(list) {
        return () => {
            this.props.onStatus && this.props.onStatus(list);
        }
    },
    onRemove(list) {
        return () => {
            this.props.onRemove && this.props.onRemove(list);
        }
    },
    render() {
        console.log('render lists');
        return (
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                {this.props.lists.length > 0
                    ? <ScrollView
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}
                        style={{flex: 1,backgroundColor: 'transparent'}}>
                        {this.props.lists.map((list, i) => {
                            console.log('render list ' + i);
                            return (
                                <View key={i} style={{flex: 1}}>
                                <ListsItemView key={i} list={list} onSelected={this.onSelected(list)} onStatus={this.onStatus(list)} onRemove={this.onRemove(list)}/>
                                </View>
                            );
                        })}
                    </ScrollView>
                    : <View style={{flex:1, marginTop: 250, alignItems: 'center'}}>
                        <Text style={{fontSize: 28, fontWeight: 'bold'}}>No Lists</Text>
                    </View>
                }
            </View>
        );
    }
});

module.exports = ListsView;
