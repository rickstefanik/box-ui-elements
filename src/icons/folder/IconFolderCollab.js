// @flow
import * as React from 'react';

import AccessibleSVG from '../accessible-svg';
import type { Icon } from '../flowTypes';

const IconFolderCollab = ({ className = '', height = 32, title, width = 32 }: Icon) => (
    <AccessibleSVG
        className={`icon-folder-collab ${className}`}
        height={height}
        title={title}
        viewBox="0 0 32 32"
        width={width}
    >
        <path
            d="M27,25H5c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h8.6L16,9h11c0.6,0,1,0.4,1,1v14C28,24.6,27.6,25,27,25z"
            fill="#42A2DB"
        />
        <path d="M26.5,24h-21C5.2,24,5,23.8,5,23.5V12h22v11.6C27,23.8,26.8,24,26.5,24z" fill="#CAE9FA" />
        <circle cx="13.6" cy="15.8" fill="#42A2DB" r="1" />
        <circle cx="18.6" cy="15.8" fill="#42A2DB" r="1" />
        <path d="M13.6,17.5c-1.4,0-2.5,1.1-2.5,2.5v1.5h5V20C16,18.6,14.9,17.5,13.6,17.5z" fill="#42A2DB" />
        <path
            d="M17,21.4v-1.5c0-0.5-0.2-1-0.5-1.4c0.5-0.6,1.2-1,2-1c1.4,0,2.5,1.1,2.5,2.5v1.5h-4V21.4z"
            fill="#42A2DB"
        />
    </AccessibleSVG>
);

export default IconFolderCollab;
