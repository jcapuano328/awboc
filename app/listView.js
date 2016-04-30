'use strict'

var React = require('react-native');
var { View, ScrollView, Text } = React;
var Icons = require('./resources/icons');
var ListItemView = require('./widgets/listItemView');

var ListView = React.createClass({
    onSelected(item) {
        return () => {
            this.props.onSelected && this.props.onSelected(item);
        }
    },
    onStatus(item) {
        return () => {
            this.props.onStatus && this.props.onStatus(item);
        }
    },
    onRemove(item) {
        return () => {
            this.props.onRemove && this.props.onRemove(item);
        }
    },
    render() {
        console.log('render list');        
        let items = this.props.list.items;
        return (
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={{backgroundColor: 'transparent',flex: 1}}>
                    {items.map((item, i) => {
                        return (
                            <ListItemView key={i} item={item} onSelected={this.onSelected(item)} onStatus={this.onStatus(item)} onRemove={this.onRemove(item)}/>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = ListView;
