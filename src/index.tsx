
import * as React from 'react';
import { render } from 'react-dom';
import style from './styles';
import './icons';

import {Toolbar} from './toolbar'
import {EditorView} from './editor'
import {PresentView} from './presentation'


class App extends React.Component {
    render() {
        return (
            <div id={style("root")}>
                <Toolbar/>
                <div className={style("split-view")}>
                    <EditorView/>
                    <PresentView/>
                </div>
            </div>
        )
    }
}

render(<App/>, document.getElementById("root") as HTMLElement)