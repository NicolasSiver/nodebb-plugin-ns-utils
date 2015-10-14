import Actions from '../actions';
import classNames from 'classnames';
import React from 'react';

export default class UtilsList extends React.Component {
    constructor(props) {
        super(props);
    }

    itemDidClick(index, utilId, e) {
        Actions.selectUtil(index, utilId);
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
        let hint;

        if (!this.props.selected) {
            hint = <small className="basic-hint"><i className="fa fa-long-arrow-down"></i> select utility</small>;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-bug"></i> Utils</div>
                <div className="panel-body">
                    {hint}
                    <ul
                        className="utils-list">
                        {this.listItems()}
                    </ul>
                </div>
            </div>
        );
    }
}
