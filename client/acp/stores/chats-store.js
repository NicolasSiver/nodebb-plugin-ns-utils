import alt from '../alt';
import Actions from '../actions/actions';

class UtilsStore {
    constructor() {
        this.bindListeners({
            getChatsStats: Actions.getChatsStats
        });

        this.state = {
            stats: null
        };
    }

    getChatsStats() {

    }
}

export default alt.createStore(UtilsStore, 'UtilsStore');