import Actions from '../actions';
import alt from '../alt';
import Util from '../models/util';

class UtilsStore {
    constructor() {
        this.bindListeners({
            selectUtil: Actions.selectUtil
        });

        this.state = {
            selected: null,
            utils   : [
                {utilId: Util.PURGE_CHATS, name: 'Purge Chats', description: ''},
                {utilId: Util.SANITIZE_DOCUMENTS, name: 'Sanitize Documents', description: ''}
            ]
        };
    }

    static getItemById(utilId) {
        let result = null;

        for (let util of this.state.utils) {
            if(util.utilId === utilId){
                result = util;
                break;
            }
        }

        return result;
    }

    selectUtil(utilItem) {
        this.setState({
            selected: utilItem.utilId
        });
    }
}

export default alt.createStore(UtilsStore, 'UtilsStore');