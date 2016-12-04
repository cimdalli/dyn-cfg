import * as _ from 'lodash'

import { ReducerBuilder } from 'redux-ts'
import { ShowLoading, HideLoading, GetConfigKeys, AddConfig } from '../actions'
import { settings } from '../settings'

export interface ConfigState {
    configs: _.Dictionary<string>;
}

export const configReducer = new ReducerBuilder<ConfigState>()
    .init({ configs: {} })

    .handle(GetConfigKeys, (state, action) => {

        action.then(dispatch => {
            dispatch(new ShowLoading());
            return fetch(settings.configServerUrl + "/all")
                .then(x => x.json())
                .then(data => {
                    for (var key in data) {
                        let application = data[key];
                        fetch(settings.configServerUrl + `/application/${application}`)
                            .then(x => x.json())
                            .then(config => {
                                dispatch(new AddConfig(application, config));
                            });
                    }
                })
                .finally(() => {
                    dispatch(new HideLoading());
                })
        });

        return state;
    })

    .handle(AddConfig, (state, action) => {
        return _.merge({}, state, {
            configs: {
                [action.application]: action.value
            }
        });
    })

    .build();