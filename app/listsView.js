'use strict'

var React = require('react-native');
var { View, ScrollView, Text } = React;
var Icons = require('./resources/icons');
var ListView = require('./widgets/listView');
var ListStore = require('./stores/lists');

var ListsView = React.createClass({
    getInitialState() {
        return {
            lists: []
        };
    },
    componentWillMount() {
        ListStore.select()
        .then((data) => {
            console.log('*********** lists');
            //console.log(data);
            this.setState({lists: data || []})
        })
        .done();
    },
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
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={{backgroundColor: 'transparent',flex: 1}}>
                    {this.state.lists.map((list, i) => {
                        return (
                            <ListView key={i} list={list} onSelected={this.onSelected(list)} onStatus={this.onStatus(list)} onRemove={this.onRemove(list)}/>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = ListsView;
