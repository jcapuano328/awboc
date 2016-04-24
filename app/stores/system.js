'use strict'
var DB = require('./db');

module.exports = {
    get() {
        return DB.system.get()
        .then((data) => {
            if (!data || data.length < 1) {
                data = {
                    version: '0.0.1',
                    initialized: false
                };
                return DB.system.remove()
                .then(() => {
                    return DB.system.add(data);
                })
                .then(() => {
                    return [data];
                });
            }
            return new Promise((accept,reject) => accept(data));
        })
        .then((data) => {
            return data[0];
        });
    },
    update(data, filter) {
        return DB.system.update(data, filter);
    }
};
