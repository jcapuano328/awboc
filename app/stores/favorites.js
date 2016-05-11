'use strict'
var DB = require('./db');

module.exports = {
    select(filter) {
        let query = null;
        if (filter) {
            query = {
                where: {
                    and: []
                }
            };
            if (filter.name) {
                query.where.and.push({ name: {eq: filter.name} });
            }
            if (filter.location) {
                query.where.and.push({ location: {eq: filter.location} });
            }
        }
        return DB.favorites.find(query)
        .then((data) => {
            return this.sort(data);
        });
    },
    sort(a) {
        if (!a) {
            return a;
        }
        return a.sort((l,r) => {
            if (l.name < r.name) {
                return -1;
            } else if (l.name > r.name) {
                return 1;
            }
            return 0;
        });
    },
    createNew(name, location) {
        return {
            "name": name,
            "location": location
        };
    },
    add(fav) {
        return this.select({name: fav.name, location: fav.location})
        .then((data) => {
            if (!data || data.length < 1) {
                return DB.favorites.add(fav);
            }
            return true;
        });
    },
    remove(favorite) {
        if (favorite._id) {
            return DB.favorites.removeById(favorite._id);
        }
        return new Promise((accept,reject) => accept());
    },
    removeByKey(name, location) {
        let query = {
            where: {
                and: [
                    { name: {eq: name} },
                    { location: {eq: location} }
                ]
            }
        };
        return DB.favorites.remove(query);
    }
};
