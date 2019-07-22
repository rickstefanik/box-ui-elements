// @flow
import * as React from 'react';
import classNames from 'classnames';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';
import Table, { Column } from 'react-virtualized/dist/es/Table';
import uniqueId from 'lodash/uniqueId';
import getProp from 'lodash/get';

import 'react-virtualized/styles.css';
import './GridView.scss';

type TableCellRendererParams = {
    cellData: ?any,
    columnData: ?any,
    dataKey: string,
    parent: Object,
    rowData: any,
    rowIndex: number,
};

type Props = {
    columnCount: number,
    currentCollection: Collection,
    height: number,
    onItemSelect: (item: BoxItem, callback: Function) => void,
    slotRenderer: (slotIndex: number) => ?React.Element<any>,
    width: number,
};

type RowGetterParams = {
    index: number,
};

class GridView extends React.Component<Props> {
    cache = new CellMeasurerCache({
        defaultHeight: 300,
        defaultWidth: 400,
        fixedWidth: true,
    });

    componentDidUpdate(prevProps: Props) {
        const { columnCount, currentCollection, width } = this.props;

        // The React Virtualized Table must be notified when either the cached
        // row sizes or the parent width change. If omitted, rows are sized
        // incorrectly resulting in gaps or content overlap.
        if (
            columnCount !== prevProps.columnCount ||
            width !== prevProps.width ||
            currentCollection.id !== prevProps.currentCollection.id
        ) {
            this.cache.clearAll();
            this.forceUpdate();
        }
    }

    cellRenderer = ({ dataKey, parent, rowIndex }: TableCellRendererParams) => {
        const { columnCount, currentCollection, onItemSelect, slotRenderer } = this.props;
        const count = getProp(currentCollection, 'items.length', 0);
        const contents = [];

        const startingIndex = rowIndex * columnCount;
        const maxSlotIndex = Math.min(startingIndex + columnCount, count);

        for (let slotIndex = startingIndex; slotIndex < maxSlotIndex; slotIndex += 1) {
            // using item's id as key is important for renrendering.  React Virtualized Table rerenders
            // on every 1px scroll, so using improper key would lead to image flickering in each
            // card of the grid view when scrolling.
            const item = getProp(currentCollection, `items[${slotIndex}]`);
            const className = classNames('bdl-GridView-slot', {
                'bdl-GridView-slot--selected': getProp(item, 'selected'),
            });

            contents.push(
                <div
                    key={getProp(item, `id`) || uniqueId('bdl-GridView-slot')}
                    className={className}
                    onClick={() => onItemSelect(item)}
                    role="presentation"
                >
                    {slotRenderer(slotIndex)}
                </div>,
            );
        }

        return (
            <CellMeasurer key={dataKey} cache={this.cache} columnIndex={0} parent={parent} rowIndex={rowIndex}>
                <div className="bdl-GridView-row">{contents}</div>
            </CellMeasurer>
        );
    };

    rowGetter = ({ index }: RowGetterParams) => {
        return index;
    };

    render() {
        const { columnCount, currentCollection, height, width } = this.props;
        const count = getProp(currentCollection, 'items.length', 0);
        const rowCount = Math.ceil(count / columnCount);

        return (
            <Table
                className={classNames('bdl-GridView', `bdl-GridView--columns-${columnCount}`)}
                disableHeader
                height={height}
                rowCount={rowCount}
                rowGetter={this.rowGetter}
                rowHeight={this.cache.rowHeight}
                width={width}
                gridClassName="bdl-GridView-body"
                rowClassName="bdl-GridView-tableRow"
                scrollToIndex={0}
                sortDirection="ASC"
            >
                <Column cellRenderer={this.cellRenderer} dataKey="" flexGrow={1} width={400} />
            </Table>
        );
    }
}

export default GridView;
