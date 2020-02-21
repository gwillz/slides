
import * as React from 'react'
import styles from './styles';
import { connect, DispatchProp } from 'react-redux';
import { State as Store, Action } from './store';
import { Markdown } from './markdown';

const HELP_TEXT = `
## Markdown Slides

Quicky create a presentation with just a bit of 
[markdown](//www.markdownguide.org/cheat-sheet/).

 * Use \`---\` to create a new slide.
 * Use \`[//]: # (...)\` to create notes.
 * Add \`?url=...\` in the address bar to load remote files.

Tutorial [here](//${window.location.host}${window.location.pathname}?tutorial).

Code [here](//github.com/gwillz/slides).
`


type Props = DispatchProp<Action> & {
    isOpen: boolean;
}

export class HelpModal extends React.PureComponent<Props> {
    
    private handleClose = () => {
        this.props.dispatch({ type: 'MODAL_CLOSE' });
    }
    
    render() {
        return (
            <div className={styles({
                'modal': true,
                'active': this.props.isOpen,
            })}>
                <div className={styles('inner', 'sticky')}>
                    <Markdown content={HELP_TEXT}/>
                    <div className={styles('stick', 'flex-nav')}>
                        <button
                            onClick={this.handleClose}
                            className={styles('button')}>
                            thnx, bye
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const map = (state: Store) => ({
    isOpen: state.modal === "help",
})

export default connect(map)(HelpModal);