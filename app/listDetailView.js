'use strict'

var React = require('react-native');
var { View, ScrollView, Switch, Text, TextInput } = React;
var ListItemView = require('./widgets/listItemView');
var DateTimePicker = require('./widgets/datetimePicker');
var IconButton = require('./widgets/iconButton');

var ListDetailView = React.createClass({
    getInitialState() {
        return {
            name: this.props.list.name,
            location: this.props.list.location,
            on: this.props.list.on,
            status: this.props.list.status,
            created: this.props.list.created,
            modified: this.props.list.modified,
            items: this.props.list.items
        };
    },
    onChangeName(v) {
        this.setState({name: v});
        this.props.onChanged && this.props.onChanged({name: 'name', value: v});
    },
    onChangeLocation(v) {
        this.setState({location: v});
        this.props.onChanged && this.props.onChanged({name: 'location', value: v});
    },
    onChangeOn(v) {
        this.setState({on: v});
        this.props.onChanged && this.props.onChanged({name: 'on', value: v});
    },
    onStatusChanged(v) {
        let status = v ? 'complete' : 'open';
        this.setState({status: status});
        this.props.onChanged && this.props.onChanged({name: 'status', value: status});
    },
    onItemAdd() {
        this.props.onAdd && this.props.onAdd();
    },
    onItemRemove(item) {
        return () => {
            this.props.onRemove && this.props.onRemove(item);
        }
    },
    onItemSelected(item) {
        return () => {
            this.props.onSelected && this.props.onSelected(item);
        }
    },
    onItemChanged(item) {
        return (f,v) => {
            console.log('item ' + item.name + ' ' + f + ' = ' + v);
            var idx = this.state.items.indexOf(item);
            if (idx > -1) {
                this.state.items[idx][f] = v;
            }
            this.props.onChanged && this.props.onChanged({name: f, value: v});
        }
    },
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
                <DateTimePicker label={'On'} value={this.state.on} date={true} time={true} onChanged={this.onChangeOn} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Complete</Text>
                    <Switch value={this.state.status == 'complete'} onValueChange={this.onStatusChanged} />
                </View>
                <View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 7,
                        backgroundColor: 'cornflowerblue', borderColor: 'black', borderWidth: 1, borderRadius: 2, borderStyle: 'solid'
                    }}>
                        <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold', margin: 10}}>Items</Text>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            <IconButton image={'add'} onPress={this.onItemAdd} />
                        </View>
                    </View>
                    {this.state.items.length > 0
                    ? (
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}
                            style={{backgroundColor: 'transparent',flex: 1}}>
                            {this.state.items.map((item, i) => {
                                return (
                                    <ListItemView key={i} item={item} events={this.props.events} onChanged={this.onItemChanged(item)} onSelected={this.onItemSelected(item)} onRemove={this.onItemRemove(item)} />
                                );
                            })}
                        </ScrollView>
                    )
                    : (
                        <View style={{flex:1, marginTop: 250, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>No Items</Text>
                        </View>
                    )
                    }
                </View>
            </View>
        );
    }
});

module.exports = ListDetailView;
