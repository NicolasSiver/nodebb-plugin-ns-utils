import Bluebird from 'bluebird';
import SocketMethod from '../models/socket-method';

let socketEmit = Bluebird.promisify(socket.emit);
let App = app; //Global app

export default class SocketService {
    static getChatsStats() {
        return socketEmit(SocketMethod.GET_CHATS_STATS, {})
            .catch((error) => {
                App.alertError(error.message);
            });
    }
}