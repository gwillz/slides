
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as qs from 'qs'
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

async function loadParams() {
    const params = qs.parse(window.location.hash.slice(1));
    
    if (params.url) {
        let url: string = params.url;
        url = window.location.protocol + "//" + url.replace(/^http:/, '');
        
        const req = await fetch(url, {mode: 'cors'});
        const content = await req.text();
        
        store.dispatch({ type: "LOAD", content });
    }
}


render(<App/>, document.getElementById("root") as HTMLElement)
loadParams();
