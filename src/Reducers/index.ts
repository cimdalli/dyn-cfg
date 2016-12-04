import * as Layout from "./layoutReducer"
import * as Auth from "./authReducer"
import * as Config from "./configReducer"

import { ReducersMapObject } from 'redux'


export interface StoreState {
    layout: Layout.LayoutState
    auth: Auth.AuthState
    config: Config.ConfigState
}

export const reducers: ReducersMapObject = {
    layout: Layout.layoutReducer,
    auth: Auth.authReducer,
    config: Config.configReducer
}