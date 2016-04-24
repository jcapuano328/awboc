'use strict';

var React = require('react-native');
var { ToolbarAndroid, } = React;
var Icons = require('../resources/icons');

var TitleBar = React.createClass({
    getInitialState() {
        let state = {actions: []};
        if (this.props.onAdd) {
          state.actions.push({
            title: 'Add',
            icon: Icons.add,
            show: 'always',
            handler: this.props.onAdd
          });
        }
        if (this.props.onFilter) {
            state.actions.push({
              title: 'Today',
              handler: this.props.onFilter
            });
            state.actions.push({
              title: 'Yesterday',
              handler: this.props.onFilter
            });
            state.actions.push({
              title: 'All',
              handler: this.props.onFilter
            });
        }

        return state;
    },
    onActionSelected(position) {
        let action = this.state.actions[position];
        if (action) {
            action.handler && action.handler(action.title);
        }
    },
    render() {
        return (
            <ToolbarAndroid
                navIcon={Icons.logo}
                style={this.props.barStyle || {backgroundColor: '#e9eaed',height: 64}}
                title={this.props.title}
                subtitle={this.props.subtitle}
                subtitleColor={this.props.subtitleColor || 'blue'}
                onIconClicked={this.props.onMenu}
                actions={this.state.actions}
                onActionSelected={this.onActionSelected}
            />
        );
    },
});

module.exports = TitleBar;
