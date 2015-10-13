import classNames from 'classnames';
import React from 'react';
import UtilActions from '../actions/utils-actions';

export default class UtilsList extends React.Component {
    constructor(props) {
        super(props);
    }

    itemDidClick(index, utilId, e) {
        UtilActions.selectUtil(index, utilId);
    }

    listItems() {
        return this.props.utils.map((util, index) => {
            return (
                <li
                    key={index}
                    className={classNames({selected: util.utilId === this.props.selected})}
                    onClick={this.itemDidClick.bind(this, index, util.utilId)}>{util.name}</li>
            );
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-bug"></i> Utils</div>
                <div className="panel-body">
                    <ul
                        className="utils-list">
                        {this.listItems()}
                    </ul>
                </div>
            </div>
        );
    }
}
