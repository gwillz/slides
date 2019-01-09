
import * as React from 'react';
import { render } from 'react-dom';
import style from './styles';

import {Toolbar} from './toolbar'
import {Editor} from './editor'
import {Presentation} from './presentation'


class App extends React.Component {
    render() {
        return (
            <div id={style("root")}>
                <Toolbar/>
                <div className={style("split-view")}>
                    <Editor/>
                    <Presentation/>
                </div>
            </div>
        )
    }
}

render(<App/>, document.getElementById("root") as HTMLElement)