// @flow
import * as React from 'react';
import classNames from 'classnames';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer';
import Table, { Column } from 'react-virtualized/dist/es/Table';
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

    componentDidUpdate({ columnCount: prevColumnCount, width: prevWidth }: Props) {
        const { columnCount, width } = this.props;

        // The React Virtualized Table must be notified whenever the heights of rows
        // could potentially change. If omitted, rows are sized
        // incorrectly resulting in gaps or content overlap.
        if (columnCount !== prevColumnCount || width !== prevWidth) {
            this.cache.clearAll();
            this.forceUpdate();
        }
    }

    cellRenderer = ({ dataKey, parent, rowIndex }: TableCellRendererParams) => {
        const { columnCount, currentCollection, slotRenderer } = this.props;
        const count = getProp(currentCollection, 'items.length', 0);
        const contents = [];

        const startingIndex = rowIndex * columnCount;
        const maxSlotIndex = Math.min(startingIndex + columnCount, count);

        const slotWidth = `${(100 / columnCount).toFixed(4)}%`;

        for (let slotIndex = startingIndex; slotIndex < maxSlotIndex; slotIndex += 1) {
            const item = getProp(currentCollection, `items[${slotIndex}]`);
            const { id, selected } = item;

            // using item's id as key is important for renrendering.  React Virtualized Table rerenders
            // on every 1px scroll, so using improper key would lead to image flickering in each
            // card of the grid view when scrolling.
            contents.push(
                <div
                    key={id}
                    className="bdl-GridView-slotWrapper"
                    style={{ maxWidth: slotWidth, flexBasis: slotWidth }}
                >
                    <div
                        className={classNames('bdl-GridView-slot', {
                            'bdl-GridView-slot--selected': selected,
                        })}
                    >
                        {slotRenderer(slotIndex)}
                    </div>
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
                className="bdl-GridView"
                disableHeader
                height={height}
                rowCount={rowCount}
                rowGetter={this.rowGetter}
                rowHeight={this.cache.rowHeight}
                width={width}
                gridClassName="bdl-GridView-body"
                rowClassName="bdl-GridView-tableRow"
                rowStyle={{ paddingRight: 0, width: '100%' }}
                scrollToIndex={0}
                sortDirection="ASC"
            >
                <Column cellRenderer={this.cellRenderer} dataKey="" flexGrow={1} width={400} />
            </Table>
        );
    }
}

export default GridView;
