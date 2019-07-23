// @flow
import * as React from 'react';
import GridView from './GridView';

type Props = {
    currentCollection: Collection,
    gridColumnCount: number,
    height: number,
    onItemSelect: (item: BoxItem, callback: Function) => void,
    slotRenderer: (slotIndex: number) => ?React.Element<any>,
    width: number,
};

const MAX_COLUMN_COUNT = 7;

const ONE_COLUMN_BREAKPOINT = 700;
const THREE_COLUMN_BREAKPOINT = 1400;

const GridViewWrapper = ({ gridColumnCount, width, ...rest }: Props) => {
    let maxColumns = MAX_COLUMN_COUNT;
    if (width < ONE_COLUMN_BREAKPOINT) {
        maxColumns = 1;
    } else if (width < THREE_COLUMN_BREAKPOINT) {
        maxColumns = 3;
    }

    return <GridView columnCount={Math.min(maxColumns, gridColumnCount)} width={width} {...rest} />;
};

export default GridViewWrapper;
