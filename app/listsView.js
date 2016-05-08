'use strict'

var React = require('react-native');
var { View, ScrollView, Text } = React;
var Icons = require('./resources/icons');
var ListsItemView = require('./widgets/listsItemView');
var ListsStore = require('./stores/lists');

var ListsView = React.createClass({
    getInitialState() {
        return {
            lists: this.props.lists
        };
    },
    onSelected(list) {
        return () => {
            this.props.onSelected && this.props.onSelected(list);
        }
    },
    onRemove(list) {
        return () => {
            this.props.onRemove && this.props.onRemove(list);
        }
    },
    onChanged(list) {
        return (f,v) => {
            let idx = this.state.lists.indexOf(list);
            if (idx > -1) {
                this.state.lists[idx][f] = v;
                this.setState({lists: ListsStore.sort(this.state.lists)});
            }
            this.props.onChanged && this.props.onChanged(list, {name: f, value: v});
        }
    },
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: 10,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                {this.state.lists.length > 0
                    ? (
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}
                            style={{flex: 1,backgroundColor: 'transparent'}}>
                            {this.state.lists.map((list, i) => {                                
                                return (
                                    <View key={i} style={{flex: 1}}>
                                    <ListsItemView key={i} list={list}
                                        onSelected={this.onSelected(list)}
                                        onRemove={this.onRemove(list)}
                                        onChanged={this.onChanged(list)}
                                        />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )
                    : (
                        <View style={{flex:1, marginTop: 250, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>No Lists</Text>
                        </View>
                    )
                }
            </View>
        );
    }
});

module.exports = ListsView;
