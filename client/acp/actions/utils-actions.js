import alt from '../alt';

class UtilsActions {
    selectUtil(utilId) {
        return {utilId}
    }
}

export default alt.createActions(UtilsActions);