import Store from 'react-native-store';

const DB = {
    'system': Store.model('awboc-system'),
    'lists': Store.model('awboc-lists'),
    'favorites': Store.model('awboc-favorites')
};

module.exports = DB;
