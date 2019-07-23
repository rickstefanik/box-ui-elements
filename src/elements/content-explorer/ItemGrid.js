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
    ...$Exact<ItemGridProps>,
};

const ItemGrid = ({ currentCollection, gridColumnCount, onItemSelect, rootId, ...rest }: Props) => {
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

    return (
        <AutoSizer>
            {({ height, width }) => (
                <GridViewWrapper
                    currentCollection={currentCollection}
                    gridColumnCount={gridColumnCount}
                    height={height}
                    onItemSelect={onItemSelect}
                    slotRenderer={slotRenderer}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};

export default ItemGrid;
