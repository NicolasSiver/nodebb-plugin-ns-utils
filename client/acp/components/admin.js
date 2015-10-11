import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import UtilsList from './utils-list';
import UtilsStore from '../stores/utils-store';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    static getStores() {
        return [UtilsStore];
    }

    static getPropsFromStores() {
        return UtilsStore.getState();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <UtilsList
                        selected={this.props.selected}
                        utils={this.props.utils}/>
                </div>
                <div className="col-md-9">

                </div>
            </div>
        );
    }
}

export default connectToStores(Admin);
