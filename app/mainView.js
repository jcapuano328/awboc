'use strict';

var React = require('react-native');
var { View, Text, Navigator, Alert } = React;
var DrawerLayout = require('./widgets/drawerLayout');
var NavMenu = require('./widgets/navMenu');
var TitleBar = require('./widgets/titleBar');
import { MenuContext } from 'react-native-menu';
var LandingView = require('./landingView');
var ListsView = require('./listsView');
var ListDetailView = require('./listDetailView');
var ListItemDetailView = require('./listItemDetailView');
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
                list: {index: 2, name: 'list', title: 'List', onMenu: this.navMenuHandler, onAccept: this.onAccept('list'), onDiscard: this.onDiscard('list')},
                item: {index: 3, name: 'item', title: 'Item', onMenu: this.navMenuHandler},
                about: {index: 4, name: 'about'}
            },
            version: '',
            filter: 'all',//'today',
            lists: [],
            selectedList: null,
            selectedItem: null
        };
    },
    fetchLists() {
        return ListsStore.select(this.state.filter)
        .then((data) => {
            console.log('*********** lists');
            //console.log(data);
            this.setState({lists: data || []});
            return data;
        })
        .catch((e) => {
            console.error(e);
        });
    },
    componentWillMount() {
        //console.log('set initial route');
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
            return new Promise((accept,reject) => accept());
        })
        .then(() => {
            return this.fetchLists();
        })
        .then((data) => {
            //console.log('go to lists');
            //*
            this.state.initialRoute = this.state.routes.lists;
            this.refs.navigator.push(this.state.routes.lists);
            //*/
            /*
            this.state.selectedList = data[0];
            this.state.routes.list.title = data[0].name;
            this.state.initialRoute = this.state.routes.list;
            this.refs.navigator.resetTo(this.state.routes.list);
            */
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
        //console.log(e);
        if (e == 'About') {
            this.refs.navigator.push(this.state.routes.about);
        } else if (e == 'Home') {
            // check for pending modifications first??
            this.setState({selectedList: null, selectedItem: null});
            this.refs.navigator.popToRoute(this.state.routes.lists);
        }
        this.toggleDrawer();
    },
    onAdd() {
        console.log('add list');
        var list = ListsStore.createNewList('');
        this.state.routes.list.title = 'New List';
        this.setState({selectedList: list});
        this.refs.navigator.push(this.state.routes.list);
    },
    onFilter(filter) {
        console.log(filter);
        this.state.filter = filter;
        this.fetchLists().done();
    },
    onAccept(type) {
        return () => {
            console.log('accept');
            if (type == 'list' && this.state.selectedList) {
                if (this.state.lists.indexOf(this.state.selectedList) < 0) {
                    console.log('adding new list');
                    this.state.lists.push(this.state.selectedList);
                    ListsStore.add(this.state.selectedList)
                    .then(() => {
                        console.log('list added');
                    })
                    .catch((e) => {
                        console.error(e);
                    });
                } else {
                    console.log('updating existing list');
                    ListsStore.update(this.state.selectedList)
                    .then(() => {
                        console.log('list updated');
                    })
                    .catch((e) => {
                        console.error(e);
                    });
                }
                this.setState({lists: ListsStore.sort(this.state.lists), selectedList: null});
            } else if (type == 'item' && this.state.selectedItem) {

            }
            this.refs.navigator.pop();
        }
    },
    onDiscard(type) {
        return () => {
            console.log('discard');
            if (type == 'list' && this.state.selectedList) {
                this.setState({selectedList: null});
            } else if (type == 'item' && this.state.selectedItem) {

            }
            this.refs.navigator.pop();
        }
    },
    filterTitle() {
        let title = '';
        if (this.state.filter == 'all') {
            title = 'All';
        } else if (this.state.filter == 'today') {
            title = "Today's";
        } else if (this.state.filter == 'yesterday') {
            title = "Yesterday's";
        }
        return title + ' Lists';
    },
    renderScene(route, navigator) {
        route = route || {};
        //console.log('render scene ' + route.name);
        if (route.name == 'landing') {
            return (
                <LandingView />
            );
        }
        if (route.name == 'lists') {
            this.state.routes.lists.title = this.filterTitle();
            return (
                <View style={{marginTop: 50}}>
                    <ListsView lists={this.state.lists}
                        onSelected={(e) => {
                            console.log('*********** selected list ' + e.name);
                            this.state.routes.list.title = e.name;
                            this.setState({selectedList: e});
                            navigator.push(this.state.routes.list);
                        }}
                        onRemove={(e) => {
                            Alert.alert('Remove List ' + e.name + '?', 'The list and all of its items will be permanently removed', [
                                {text: 'No', style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                    console.log('*********** remove list ' + e.name);
                                    var idx = this.state.lists.indexOf(e);
                                    if (idx > -1) {
                                        this.state.lists.splice(idx, 1);
                                        this.setState({lists: ListsStore.sort(this.state.lists), selectedList: null});
                                        ListsStore.remove(e)
                                        .then(() => {
                                            console.log('list removed');
                                        })
                                        .catch((ex) => {
                                            console.error(ex);
                                        });
                                    }
                                }}
                            ]);
                        }}
                    />
                </View>
            );
        }

        if (route.name == 'list') {
            return (
                <View style={{marginTop: 50}}>
                    <ListDetailView list={this.state.selectedList}
                        onSelected={(e) => {
                            console.log('*********** selected');
                            console.log(e.name);
                            this.state.selectedItem = e;
                            this.state.routes.item.title = e.name;
                            navigator.push(this.state.routes.item);
                        }}
                        onChanged={(e) => {
                            console.log('*********** modified list');
                            console.log(e.name + ' = ' + e.value);
                            if (this.state.selectedList) {
                                this.state.selectedList[e.name] = e.value;
                                if (e.name == 'name') {
                                    this.state.routes.list.title = e.value;
                                }
                                this.setState({selectedList: this.state.selectedList});
                            }
                        }}
                        onAdd={() => {
                            console.log('*********** add item to list');
                            this.state.selectedItem = ListsStore.createNewListItem('');
                            this.state.routes.item.title = 'New Item';
                            navigator.push(this.state.routes.item);
                        }}
                        onRemove={(e) => {
                            console.log('*********** remove item ' + e.name + ' from list');
                            var idx = this.state.selectedList.items.indexOf(this.state.selectedItem);
                            if (idx > -1) {
                                this.state.selectedList.items.splice(idx, 1);
                            }
                            this.setState({lists: this.state.lists, selectedItem: null});
                            ListsStore.update(this.state.selectedList)
                            .then(() => {
                                console.log('list item removed');
                            })
                            .catch((ex) => {
                                console.error(ex);
                            });
                        }}
                    />
                </View>
            );
        }

        if (route.name == 'item') {
            return (
                <View style={{marginTop: 50}}>
                    <ListItemDetailView item={this.state.selectedItem}
                        onOk={(e) => {
                            console.log('*********** accept changes');
                            console.log(e.name);
                        }}
                        onCancel={(e) => {
                            console.log('*********** discard changes');
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
                        navigationBar={<Navigator.NavigationBar style={{backgroundColor: 'cornflowerblue'}} routeMapper={TitleBar()} />}
                    />
                    </MenuContext>
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
