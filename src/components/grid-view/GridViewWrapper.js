// @flow
import * as React from 'react';
import GridView from './GridView';

type Props = {
    currentCollection: Collection,
    gridColumnCount: number,
    height: number,
    maxGridColumnCount: number,
    onItemSelect: (item: BoxItem, callback: Function) => void,
    slotRenderer: (slotIndex: number) => ?React.Element<any>,
    updateMaxColumns: (maxGridColumnCount: number) => void,
    width: number,
};

// const ONE_COLUMN_BREAKPOINT = 700;
// const THREE_COLUMN_BREAKPOINT = 1400;

const GridViewWrapper = ({ gridColumnCount, maxGridColumnCount, updateMaxColumns, width, ...rest }: Props) => {
    // let maxColumns = maxGridColumnCount;
    // if (width < ONE_COLUMN_BREAKPOINT) {
    //     maxColumns = 1;
    // } else if (width < THREE_COLUMN_BREAKPOINT) {
    //     maxColumns = 3;
    // }
    // console.log(`in GridViewWrapper.  maxColumns: ${maxColumns}, maxGridColumnCount: ${maxGridColumnCount}`);
    // updateMaxColumns(maxColumns);

    return <GridView columnCount={gridColumnCount} width={width} {...rest} />;
};

export default GridViewWrapper;
