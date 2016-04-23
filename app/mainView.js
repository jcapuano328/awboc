'use strict';

var React = require('react-native');
var { View, Navigator } = React;
var DrawerLayout = require('./widgets/drawerLayout');
var NavMenu = require('./widgets/navMenu');
var ListsView = require('./listsView');
var LandingView = require('./landingView');
var AboutView = require('./aboutView');

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            current: false,
            about: false
        }
    },
    componentWillMount() {
        this.fetchData();
    },
    fetchData() {
        console.log('mainView: load current lists');
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
            //this.setState({})
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
                            if (!this.state.current) {
                                return (
                                    <LandingView onMenu={this.menuHandler} onAbout={this.aboutHandler}/>
                                );
                            }
                            return (
                                <ListsView onMenu={this.menuHandler} onAbout={this.aboutHandler}/>
                            );
                        }}
                    />
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
