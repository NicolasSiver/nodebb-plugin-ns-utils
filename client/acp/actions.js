import alt from './alt';

class Actions {

    getChatsStats() {
        this.dispatch();
    }

    selectUtil(index, utilId) {
        return {index, utilId}
    }
}

export default alt.createActions(Actions);