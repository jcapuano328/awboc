'use strict'
var DB = require('./db');
var moment = require('moment');

module.exports = {
    initialize() {
        return DB.lists.remove()
        .then(() => {
            // load up some sample data...
            let sample = require('./sample.json');
            let work = (a) => {
                if (a.length > 0) {
                    var l = a.shift();
                    l.created = new Date();
                    l.modified = new Date();
                    l.items.forEach((i) => {
                        i.created = new Date();
                        i.modified = new Date();
                    });
                    console.log('*********** add list ' + l.name);
                    //console.log(l);
                    return DB.lists.add(l)
                    .then(() => {
                        return work(a);
                    });
                }
                return new Promise((accept,reject) => accept());
            }
            return work(sample);
        });
    },
    select(filter) {
        let query = null;
        /*
        let query = {
            order: {
                on: 'DESC'
            }
        };
        if (filter == 'today') {
            var now = moment();
            query.where = {
                and: [
                    {
                        on: {
                            eq: now.format('YYYY-MM-DD')
                        }
                    }
                ]
            };
        }
        else if (filter == 'yesterday') {
            var now = moment().subtract(1, 'days');
            query.where = {
                and: [
                    {
                        on: {
                            eq: now.format('YYYY-MM-DD')
                        }
                    }
                ]
            };
        }
        */
        //console.log(query);
        return DB.lists.find(query)
        .then((data) => {
            if (filter == 'today' || filter == 'yesterday') {
                let date = (filter == 'yesterday' ? moment().subtract(1, 'days') : moment()).format('YYYY-MM-DD');
                data = data.filter((v,i) => {
                    return date == moment(v.on).format('YYYY-MM-DD');
                });
            }
            return this.sort(data);
        });
    },
    sort(a) {
        return a.sort((l,r) => {
            var lon = moment(l.on);
            var ron = moment(r.on);
            if (l.status < r.status) {
                return 1;
            } else if (l.status > r.status) {
                return -1;
            } else if (lon.isBefore(ron)) {
                return 1;
            } else if (lon.isAfter(ron)) {
                return -1;
            } else if (l.name < r.name) {
                return -1;
            } else if (l.name > r.name) {
                return 1;
            }
            return 0;
        });
    },
    createNewList(name) {
        return {
            "name": name,
            "location": "",
            "status": "open",
            "on": new Date(),
            "created": new Date(),
            "modified": null,
            "items": []
        };
    },
    createNewListItem(name) {
        return {
            "name": name,
            "details": "",
            "location": "",
            "status": "open",
            "created": new Date(),
            "modified": null
        };
    },
    add(list) {
        return DB.lists.add(list);
    },
    update(list) {
        return DB.lists.updateById(list, list._id);
    },
    remove(list) {
        if (list._id) {
            return DB.lists.removeById(list._id);
        }
        return new Promise((accept,reject) => accept());
    }
};
