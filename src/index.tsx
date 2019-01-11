
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
import { Unsubscribe } from 'redux';

type State = {
    dark: boolean;
}

class App extends React.Component<{}, State> {
    state: State = {
        dark: false,
    }
    
    private unsubscribe: Unsubscribe;
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(this.handleStore);
    }
    
    private handleStore = () => {
        let state = store.getState();
        if (state.action == "DARK") {
            this.setState({
                dark: state.dark,
            })
        }
    }
    
    render() {
        return (
            <Provider store={store}>
                <div id={style("root")} className={style({
                    dark: this.state.dark,
                })}>
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
    const params = qs.parse(window.location.search.slice(1));
    
    if (params.url) {
        let url: string = params.url;
        url = window.location.protocol + "//" + url.replace(/^http:/, '');
        
        const req = await fetch(url, {
            mode: 'cors',
            redirect: 'follow',
        });
        
        const content = await req.text();
        store.dispatch({ type: "LOAD", content });
    }
}

render(<App/>, document.getElementById("root") as HTMLElement)
loadParams();

