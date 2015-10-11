import alt from '../alt';
import UtilsActions from '../actions/utils-actions';

class UtilsStore {
    constructor() {
        this.bindListeners({
            selectUtil: UtilsActions.selectUtil
        });

        this.state = {
            selected: null,
            utils   : []
        };
    }

    selectUtil(util) {
        this.setState({
            selected: util.utildId
        });
    }
}

export default alt.createStore(UtilsStore, 'UtilsStore');