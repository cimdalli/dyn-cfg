import { SyncAction, AsyncAction } from 'redux-ts'


export class GetConfigKeys extends AsyncAction { }
export class GetConfig extends AsyncAction {
    constructor(private application: string) {
        super();
    }
}
export class AddConfig extends SyncAction {
    constructor(public application: string, public value: any) {
        super();
    }
}