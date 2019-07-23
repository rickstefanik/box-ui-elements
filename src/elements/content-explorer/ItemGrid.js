// @flow
import React from 'react';
import getProp from 'lodash/get';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import GridViewWrapper from '../../components/grid-view/GridViewWrapper';
import ItemGridCell from './ItemGridCell';
import type { ItemGridProps } from './flowTypes';

type Props = {
    currentCollection: Collection,
    gridColumnCount: number,
    maxGridColumnCount: number,
    updateMaxColumns: (maxGridColumnCount: number) => void,
    ...$Exact<ItemGridProps>,
};

const ItemGrid = ({
    currentCollection,
    gridColumnCount,
    maxGridColumnCount,
    onItemSelect,
    rootId,
    updateMaxColumns,
    ...rest
}: Props) => {
    const ONE_COLUMN_BREAKPOINT = 700;
    const THREE_COLUMN_BREAKPOINT = 1400;
    /**
     * Renderer used for cards in grid view
     *
     * @param {number} slotIndex - index of item in currentCollection.items
     * @return {React.Element} - Element to display in card
     */
    const slotRenderer = (slotIndex: number) => {
        const item: ?BoxItem = getProp(currentCollection, `items[${slotIndex}]`);

        return item ? <ItemGridCell item={item} onItemSelect={onItemSelect} rootId={rootId} {...rest} /> : null;
    };

    const onResize = ({ width }) => {
        console.log(`width: ${width}`);
        let maxColumns = 7;
        if (width < ONE_COLUMN_BREAKPOINT) {
            maxColumns = 1;
        } else if (width < THREE_COLUMN_BREAKPOINT) {
            maxColumns = 3;
        }
        console.log(`in onResize.  maxColumns: ${maxColumns}, maxGridColumnCount: ${maxGridColumnCount}`);
        updateMaxColumns(maxColumns);
    };

    return (
        <AutoSizer onResize={onResize}>
            {({ height, width }) => (
                <GridViewWrapper
                    currentCollection={currentCollection}
                    gridColumnCount={gridColumnCount}
                    height={height}
                    maxGridColumnCount={maxGridColumnCount}
                    onItemSelect={onItemSelect}
                    slotRenderer={slotRenderer}
                    updateMaxColumns={updateMaxColumns}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};

export default ItemGrid;
