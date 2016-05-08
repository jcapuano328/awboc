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
    onChangeName(v) {
        this.setState({name: v});
        this.props.onChanged && this.props.onChanged({name: 'name', value: v});
        //this.raiseChanged({name: 'name', value: v});
    },
    onChangeLocation(v) {
        this.setState({location: v});
        this.props.onChanged && this.props.onChanged({name: 'location', value: v});
        //this.raiseChanged({name: 'location', value: v});
    },
    onChangeDetails(v) {
        this.setState({details: v});
        this.props.onChanged && this.props.onChanged({name: 'details', value: v});
        //this.raiseChanged({name: 'details', value: v});
    },
    onStatusChanged(v) {
        let status = v ? 'complete' : 'open';
        this.setState({status: status});
        this.props.onChanged && this.props.onChanged({name: 'status', value: status});
        //this.raiseChanged({name: 'status', value: status});
    },
    /*raiseChanged(e) {
        this.props.events && this.props.events.emit('itemchanged', this.props.item, e);
    },*/
    render() {
        return (
            <View style={{
                flex: 1,
                //marginTop: 30,
                //backgroundColor: 'rgba(0,0,0,0.01)',
            }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput style={{flex: 1, margin: 10, fontSize: 20}} placeholder={'Description'} onChangeText={this.onChangeName}>{this.state.name}</TextInput>
                    <TextInput style={{flex: 1, margin: 10, fontSize: 20}} placeholder={'Location'} onChangeText={this.onChangeLocation}>{this.state.location}</TextInput>
                </View>
                <TextInput style={{flex: 1, margin: 10, fontSize: 20}} placeholder={'Details'} multiline={true} onChangeText={this.onChangeDetails}>{this.state.details}</TextInput>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>Complete</Text>
                    <Switch value={this.state.status == 'complete'} onValueChange={this.onStatusChanged} />
                </View>
                {this.state.modified ? <Text>modified {moment(this.state.modified).format('MMM DD, YYYY HH:mm')}</Text> : null}
            </View>
        );
        //<Text>created {moment(this.state.created).format('MMM DD, YYYY HH:mm')}</Text>
    }
});

module.exports = ListItemDetailView;
