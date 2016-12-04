import * as React from 'react'
import * as _ from 'lodash'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import { connect } from 'react-redux'
import { Dispatch } from "redux"
import { StoreState } from '../../reducers'

import { GetConfigKeys } from '../../actions'
import JsonEditor from '../../Components/JsonEditor'

interface ConfigProps {
    dispatch?: Dispatch<any>;
    configs: _.Dictionary<String>;
}

function mapStateToProps(state: StoreState): ConfigProps {
    return {
        configs: state.config.configs
    };
}

class ConfigContainer extends React.Component<ConfigProps, any> {

    constructor(props: ConfigProps) {
        super(props);

        this.logChange = this.logChange.bind(this);
        props.dispatch(new GetConfigKeys());
    }

    logChange(value: any) {
        console.log(value);
    }

    render() {
        var applicationColumnStyle: React.CSSProperties = { width: 150, textAlign: "middle" }
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={applicationColumnStyle}>Application</TableHeaderColumn>
                        <TableHeaderColumn>Data</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        _.map(this.props.configs, (value: any, key: any) => (
                            <TableRow key={key} selectable={false}>
                                <TableRowColumn style={applicationColumnStyle}>{key}</TableRowColumn>
                                <TableRowColumn>
                                    <JsonEditor value={value} onChange={this.logChange} />
                                </TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        );
    }
}

export default connect(mapStateToProps)(ConfigContainer)

