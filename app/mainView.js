'use strict';

var React = require('react-native');
var { View, Navigator } = React;
var DrawerLayout = require('./widgets/drawerLayout');
var NavMenu = require('./widgets/navMenu');
var ListsView = require('./listsView');
var LandingView = require('./landingView');
var AboutView = require('./aboutView');
var SystemStore = require('./stores/system');
var ListsStore = require('./stores/lists');

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            home: false,
            about: false,
            version: ''
        }
    },
    componentWillMount() {
        SystemStore.get()
        .then((data) => {
            console.log(data);
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
            return new Promise((accept,reject) => accept());
        })
        .then(() => {
            this.setState({home: true});
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
            this.setState({about: true});
            //this.refs.navigator.push({name: 'about', index: 2});
        } else if (e == 'Home') {
            this.setState({home: true})
            //this.refs.navigator.push({name: 'lists', index: 1});
        }
        this.toggleDrawer();

    },
    aboutHandler() {
        this.setState({about: true});
    },
    initialRoute() {
        if (this.state.about) {
            return {name: 'about', index: 2};
        }
        else if (!this.state.current) {
            return {name: 'landing', index: 0};
        }
        return {name: 'home', index: 1};
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
                    <Navigator
                        ref="navigator"
                        initialRoute={this.initialRoute()}
                        renderScene={(route, navigator) => {
                            //console.log(route.name);
                            if (this.state.about) {
                                return (
                                    <AboutView onClose={() => {this.setState({about: false});}} />
                                );
                            }
                            if (!this.state.home) {
                                return (
                                    <LandingView onMenu={this.menuHandler} onAbout={this.aboutHandler}/>
                                );
                            }
                            return (
                                <ListsView onMenu={this.menuHandler} onAbout={this.aboutHandler}
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
                            );
                        }}
                    />
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
