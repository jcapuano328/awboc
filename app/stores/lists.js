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
                    console.log('*********** add list');
                    console.log(l);
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
            return data;
        });
    }
};
