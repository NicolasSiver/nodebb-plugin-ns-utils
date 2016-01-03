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

    updateSanitizeKeyMatch(match){
        return {match};
    }
}

export default alt.createActions(Actions);
