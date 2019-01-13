
import * as React from 'react'
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Store } from './store';

const TITLE = 'Slides';

type Props = {
    filename?: string;
}

export function Head(props: Props) {
    const filename = props.filename
        ? `${TITLE} :: ${props.filename}`
        : TITLE;
    return (
        <Helmet>
            <title>{filename}</title>
        </Helmet>
    )
}

const map = (state: Store) => ({
    filename: state.currentFile,
})

export default connect(map)(Head);
