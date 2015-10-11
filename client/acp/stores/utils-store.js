import alt from '../alt';
import Util from '../models/util';
import UtilsActions from '../actions/utils-actions';

class UtilsStore {
    constructor() {
        this.bindListeners({
            selectUtil: UtilsActions.selectUtil
        });

        this.state = {
            selected: null,
            utils   : [
                {utilId: Util.PURGE_CHATS, name: 'Purge Chats', description: ''},
                {utilId: Util.SANITIZE_DOCUMENTS, name: 'Sanitize Documents', description: ''}
            ]
        };
    }

    selectUtil(util) {
        this.setState({
            selected: util.utilId
        });
    }
}

export default alt.createStore(UtilsStore, 'UtilsStore');