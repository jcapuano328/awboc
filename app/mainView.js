'use strict';

var React = require('react-native');
var { View, Text, Navigator } = React;
var DrawerLayout = require('./widgets/drawerLayout');
var NavMenu = require('./widgets/navMenu');
var TitleBar = require('./widgets/titleBar');
import { MenuContext } from 'react-native-menu';
var ListsView = require('./listsView');
var LandingView = require('./landingView');
var AboutView = require('./aboutView');
var SystemStore = require('./stores/system');
var ListsStore = require('./stores/lists');
var title = 'Aw? Boc!';

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            routes: {
                landing: {index: 0, name: 'landing', onMenu: this.navMenuHandler},
                lists: {index: 1, name: 'lists', title: 'Lists', onMenu: this.navMenuHandler, onAdd: this.onAdd, onFilter: this.onFilter},
                list: {index: 2, name: 'list', title: 'List', onMenu: this.navMenuHandler, onAdd: this.onAdd},
                item: {index: 3, name: 'item', title: 'Item', onMenu: this.navMenuHandler},
                about: {index: 4, name: 'about'}
            },
            version: ''
        }
    },
    componentWillMount() {
        console.log('set initial route');
        this.state.initialRoute = this.state.routes.landing;
        SystemStore.get()
        .then((data) => {
            //console.log(data);
            this.state.version = data.version;
            if (!data.initialized) {
                console.log('*********** initialize lists');
                return ListsStore.initialize()
                .then(() => {
                    return SystemStore.update({version: this.state.version, initialized: true});
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            console.log('go to lists');
            this.state.initialRoute = this.state.routes.lists;
            this.refs.navigator.push(this.state.routes.lists);
            return new Promise((accept,reject) => accept());
        })
        .done();
    },
    toggleDrawer() {
        if (!this.state.drawer) {
            let open = this.refs.drawer.openDrawer || this.refs.drawer.open;
            open();
        } else {
            let close = this.refs.drawer.closeDrawer || this.refs.drawer.close;
            close();
        }
        this.state.drawer = !this.state.drawer;
    },
    menuHandler() {
        this.toggleDrawer();
    },
    navMenuHandler(e) {
        console.log(e);
        if (e == 'About') {
            this.refs.navigator.push(this.state.routes.about);
        } else if (e == 'Home') {
            this.refs.navigator.push(this.state.routes.lists);
        }
        this.toggleDrawer();
    },
    onAdd() {
        console.log('add');
    },
    onFilter(filter) {
        console.log(filter);
    },
    renderScene(route, navigator) {
        route = route || {};
        console.log('render scene ' + route.name);
        if (route.name == 'landing') {
            return (
                <LandingView />
            );
        }
        if (route.name == 'lists') {
            return (
                <View style={{marginTop: 50}}>
                    <ListsView
                        onSelected={(e) => {
                            console.log('*********** selected');
                            console.log(e.name);
                        }}
                        onStatus={(e) => {
                            console.log('*********** status change');
                            console.log(e.name);
                        }}
                        onRemove={(e) => {
                            console.log('*********** remove');
                            console.log(e.name);
                        }}
                    />
                </View>
            );
        }
        if (route.name == 'about') {
            return (
                <AboutView version={this.state.version} onClose={() => {navigator.pop();}} />
            );
        }
        return (
            <LandingView />
        );
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <DrawerLayout
                    ref="drawer"
                    onDrawerClosed={() => {this.state.drawer = false;} }
                    onDrawerOpened={() => {this.state.drawer = true;} }
                    onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
                    onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
                    drawerWidth={300}
                    renderNavigationView={() => <NavMenu onSelected={this.navMenuHandler} /> }>
                    <MenuContext style={{flex: 1}}>
                    <Navigator
                        ref="navigator"
                        debugOverlay={false}
                        initialRoute={this.state.initialRoute}
                        renderScene={this.renderScene}
                        navigationBar={<Navigator.NavigationBar routeMapper={TitleBar()} />}
                    />
                    </MenuContext>
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
