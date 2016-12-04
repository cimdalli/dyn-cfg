import * as React from "react"
import * as _ from 'lodash'

import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

interface JsonEditorProps extends __MaterialUI.Table.TableProps {
    parentKey: string;
    value: any;
    onChange: (data: any) => void;
}

export default class JsonEditor extends React.Component<JsonEditorProps, any> {
    constructor() {
        super();

        this.getItems = this.getItems.bind(this);
        this.combineKeys = this.combineKeys.bind(this);
        this.changeItem = this.changeItem.bind(this);
    }

    combineKeys(...keys: string[]) {
        return keys.join(".");
    }

    changeItem(selector: string, value: any) {
        this.props.value[selector] = value;
    }

    getItems(items: any, parentKey: string) {
        if (_.isObject(items)) {
            return _.map(items, (v, k) => {
                let key = this.combineKeys(parentKey, k.toString());
                let item: any = this.getItems(v, key);
                let isItemArray: boolean = _.isArray(item);
                let isItemBoolean: boolean = _.isBoolean(item);
                return (
                    <ListItem
                        key={key}
                        primaryText={k.toString()}
                        secondaryText={isItemArray ? "..." : item.toString()}
                        rightToggle={isItemBoolean ? <Toggle defaultToggled={item} onToggle={() => this.changeItem(key, !item)} /> : null}
                        nestedItems={isItemArray ? item : []}
                        primaryTogglesNestedList={true}
                        />
                )
            })
        }
        else {
            return items;
        }

    }

    render() {
        return (
            <List>
                {this.getItems({ "": this.props.value }, this.props.parentKey)}
            </List>
        );
    }
}
