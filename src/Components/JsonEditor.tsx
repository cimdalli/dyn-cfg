import * as React from "react"
import * as _ from 'lodash'

import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

var JSONEditor = require('jsoneditor');
require('!style!css!jsoneditor/dist/jsoneditor.css');
require('!style!css!../jsoneditor.css');


interface JsonEditorProps {
    json: Object | Array<any>
    title?: string;
}

export default class JsonEditor extends React.Component<JsonEditorProps, any> {

    editor: any;
    editorRef: HTMLDivElement;

    constructor(props: any) {
        super(props);

        this.state = {
            json: Object.assign({}, props.json),
        };

        this.editor = null;
        this.editorRef = null;
    }

    componentDidMount() {
        this.editor = new JSONEditor(this.editorRef, {
            mode: 'tree',
            onChange: this.handleChange,
        });

        var title = document.createElement("div");
        title.className = "title";
        title.innerText = this.props.title;

        this.editorRef.getElementsByClassName("jsoneditor-redo")[0].insertAdjacentElement("afterEnd", title);
        this.editor.set(this.props.json);
    }

    componentWillReceiveProps(nextProps: any) {
        this.editor.set(nextProps.json);
        this.setState({
            json: nextProps.json,
        });
    }

    componentWillUnmount() {
        this.editor.destroy();
    }

    handleChange = () => {
        try {
            this.setState({
                json: this.editor.get(),
            });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div ref={(ref) => { this.editorRef = ref; } } />
        );
    }
}
