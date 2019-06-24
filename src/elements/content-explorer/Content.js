/**
 * @flow
 * @file File picker header and list component
 * @author Box
 */

import React from 'react';
import EmptyState from '../common/empty-state';
import ProgressBar from '../common/progress-bar';
import ItemList from './ItemList';
import { VIEW_ERROR, VIEW_SELECTED } from '../../constants';
import './Content.scss';

/**
 * Determines if we should show the empty state
 *
 * @param {string} view the current view
 * @param {Object} currentCollection the current collection
 * @return {boolean} empty or not
 */
function isEmpty(view: View, currentCollection: Collection): boolean {
    const { items = [] }: Collection = currentCollection;
    return view === VIEW_ERROR || items.length === 0;
}

type Props = {
    canDelete: boolean,
    canDownload: boolean,
    canPreview: boolean,
    canRename: boolean,
    canShare: boolean,
    currentCollection: Collection,
    focusedRow: number,
    isGridView?: boolean,
    isMedium: boolean,
    isSmall: boolean,
    isTouch: boolean,
    onItemClick: Function,
    onItemDelete: Function,
    onItemDownload: Function,
    onItemPreview: Function,
    onItemRename: Function,
    onItemSelect: Function,
    onItemShare: Function,
    onSortChange: Function,
    rootElement?: HTMLElement,
    rootId: string,
    tableRef: Function,
    view: View,
};

const Content = ({
    canDelete,
    canDownload,
    canPreview,
    canRename,
    canShare,
    currentCollection,
    focusedRow,
    isGridView = false,
    isMedium,
    isSmall,
    isTouch,
    onItemClick,
    onItemDelete,
    onItemDownload,
    onItemPreview,
    onItemRename,
    onItemSelect,
    onItemShare,
    onSortChange,
    rootElement,
    rootId,
    tableRef,
    view,
}: Props) => {
    const listView = (
        <ItemList
            view={view}
            isSmall={isSmall}
            isMedium={isMedium}
            isTouch={isTouch}
            rootId={rootId}
            rootElement={rootElement}
            focusedRow={focusedRow}
            currentCollection={currentCollection}
            tableRef={tableRef}
            canShare={canShare}
            canPreview={canPreview}
            canDelete={canDelete}
            canRename={canRename}
            canDownload={canDownload}
            onItemClick={onItemClick}
            onItemSelect={onItemSelect}
            onItemDelete={onItemDelete}
            onItemDownload={onItemDownload}
            onItemRename={onItemRename}
            onItemShare={onItemShare}
            onItemPreview={onItemPreview}
            onSortChange={onSortChange}
        />
    );

    const gridView = <div>Placeholder for grid view</div>;

    const content = isGridView ? gridView : listView;

    return (
        <div className="bce-content">
            {view === VIEW_ERROR || view === VIEW_SELECTED ? null : (
                <ProgressBar percent={currentCollection.percentLoaded} />
            )}
            {isEmpty(view, currentCollection) ? (
                <EmptyState view={view} isLoading={currentCollection.percentLoaded !== 100} />
            ) : (
                content
            )}
        </div>
    );
};

export default Content;
