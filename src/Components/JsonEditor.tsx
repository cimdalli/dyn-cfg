import * as React from "react"
import * as _ from 'lodash'

import { List, ListItem } from 'material-ui/List';

interface JsonEditorProps extends __MaterialUI.Table.TableProps {
    value: any;
    onChange: (data: any) => void;
}

export default class JsonEditor extends React.Component<JsonEditorProps, any> {
    constructor() {
        super();

        this.getItems = this.getItems.bind(this);
    }

    getItems(value: any) {
        if (_.isObject(value)) {
            return _.map(value, (v, k) => {
                let nested: any = this.getItems(v);
                let isNested: boolean = _.isArray(nested);
                return (<ListItem key={k} primaryText={k.toString()} nestedItems={isNested ? nested : []} />)
            })
        }
        else {
            return value;
        }

    }

    render() {
        return (
            <List>
                {this.getItems(this.props.value)}
            </List>
        );
    }
}
