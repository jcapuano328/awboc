'use strict'
var DB = require('./db');

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
    select(query) {
        return DB.lists.find(query);
    }
};
