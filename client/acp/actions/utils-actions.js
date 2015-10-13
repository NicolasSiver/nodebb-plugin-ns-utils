import alt from '../alt';

class UtilsActions {
    selectUtil(index, utilId) {
        return {index, utilId}
    }
}

export default alt.createActions(UtilsActions);