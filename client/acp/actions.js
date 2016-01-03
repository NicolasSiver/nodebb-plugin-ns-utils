import alt from './alt';

class Actions {

    getChatsStats() {
        this.dispatch();
    }

    getDatabaseName() {
        this.dispatch();
    }

    selectUtil(index, utilId) {
        return {index, utilId}
    }

    startChatsPurge() {
        this.dispatch();
    }

    startSanitize(options) {
        return {options};
    }
}

export default alt.createActions(Actions);
