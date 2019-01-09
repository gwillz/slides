
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './styles';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    icon: IconProp;
}

export function Button(props: Props) {
    let {icon, ...other} = props;
    return (
        <div className={styles("button")} {...other}>
            <FontAwesomeIcon icon={icon} />
        </div>
    )
}
