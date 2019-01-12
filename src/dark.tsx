
import * as React from 'react'
import * as qs from 'qs'
import style from './styles'
import { connect, DispatchProp } from 'react-redux';
import { Store } from './store';

type Props = React.HTMLProps<HTMLDivElement> & DispatchProp & {
    isDark?: boolean;
}

export class Dark extends React.PureComponent<Props> {
    
    private isDark: boolean;
    
    constructor(props: Props) {
        super(props);
        const params = qs.parse(window.location.search.slice(1));
        this.isDark = typeof params.dark !== 'undefined';
    }
    
    componentDidMount() {
        if (this.isDark && !this.props.isDark) {
            this.props.dispatch({type: 'DARK'});
        }
        this.isDark = false;
    }
    
    render() {
        const {isDark, dispatch, ...props} = this.props;
        return (
            <div
                className={style({ dark: this.isDark || this.props.isDark })}
                {...props}
            />
        )
    }
}

const map = (store: Store) => ({
    isDark: store.dark,
})

export default connect(map)(Dark)
