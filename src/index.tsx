
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './styles';
import store from './store'
import './icons';

import {Toolbar} from './toolbar'
import {EditorView} from './editor'
import {PresentView} from './presentation'


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div id={style("root")}>
                    <Toolbar/>
                    <div className={style("split-view")}>
                        <EditorView/>
                        <PresentView/>
                    </div>
                </div>
            </Provider>
        )
    }
}

render(<App/>, document.getElementById("root") as HTMLElement)