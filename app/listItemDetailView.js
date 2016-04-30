'use strict'

var React = require('react-native');
var { View, Switch, Text, TextInput } = React;
var Button = require('apsl-react-native-button');
var moment = require('moment');

var ListItemDetailView = React.createClass({
    getInitialState() {
        return {
            name: this.props.item.name,
            details: this.props.item.details,
            location: this.props.item.location,
            status: this.props.item.status,
            created: this.props.item.created,
            modified: this.props.item.modified
        };
    },
    onStatusChanged(v) {
        this.setState({status: v ? 'complete' : 'open'});
    },
    render() {
        console.log('render item');
        return (
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                <TextInput placeholder={'Description'} onChangeText={(v) => this.setState({name: v})}>{this.state.name}</TextInput>
                <TextInput placeholder={'Location'} onChangeText={(v) => this.setState({location: v})}>{this.state.location}</TextInput>
                <TextInput placeholder={'Details'} multiline={true} onChangeText={(v) => this.setState({details: v})}>{this.state.details}</TextInput>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>Complete</Text>
                    <Switch value={this.state.status == 'complete'} onValueChange={this.onStatusChanged} />
                </View>
                <Text>created {moment(this.state.created).format('MMM DD, YYYY HH:mm')}</Text>
                <Text>modified {moment(this.state.modified).format('MMM DD, YYYY HH:mm')}</Text>
            </View>
        );
    }
});

module.exports = ListItemDetailView;
