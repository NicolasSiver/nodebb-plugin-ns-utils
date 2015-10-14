import Actions from '../actions';
import CapabilitiesStore from '../stores/capabilities-store';
import connectToStores from 'alt/utils/connectToStores';
import objectAssign from 'object-assign';
import React from 'react';
import UtilsList from './utils-list';
import UtilsStore from '../stores/utils-store';
import UtilViewRenderer from './util-view-renderer';

class Admin extends React.Component {
    static getStores() {
        return [CapabilitiesStore, UtilsStore];
    }

    static getPropsFromStores() {
        return objectAssign(UtilsStore.getState(), CapabilitiesStore.getState());
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Actions.getDatabaseName();
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
                    <UtilViewRenderer
                        util={UtilsStore.getItemById(this.props.selected)}
                        database={this.props.database}/>
                </div>
            </div>
        );
    }
}

export default connectToStores(Admin);
