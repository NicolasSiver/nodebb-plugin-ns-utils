import React from 'react';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    getStatsList(names, data) {
        var list = [];
        for (let name in names) {
            if (names.hasOwnProperty(name) && data.hasOwnProperty(name)) {
                list.push(
                    <div key={name} className="stats-item">
                        <span className="value">{data[name]}</span>
                        <span className="value-name">{names[name]}</span>
                    </div>
                );
            }
        }
        return list;
    }

    render() {
        if (this.props.names == null || this.props.data == null) {
            return null;
        }

        let title = this.props.title || 'Statistics';

        return (
            <div className="stats">
                <h5>{title}</h5>

                <div className="stats-list">
                    {this.getStatsList(this.props.names, this.props.data)}
                </div>
            </div>
        );
    }
}
