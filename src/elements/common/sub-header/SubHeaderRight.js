/**
 * @flow
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import Sort from './Sort';
import Add from './Add';
import GridViewButton from './GridViewButton';
import { VIEW_FOLDER } from '../../../constants';
import { FeatureFlag } from '../feature-checking';
import './SubHeaderRight.scss';

type Props = {
    canCreateNewFolder: boolean,
    canUpload: boolean,
    columnCount: number,
    currentCollection: Collection,
    isGridView: boolean,
    onCreate: Function,
    onGridViewSwitch?: Function,
    onSortChange: Function,
    onUpload: Function,
    view: View,
};

const SubHeaderRight = ({
    canCreateNewFolder,
    canUpload,
    currentCollection,
    isGridView,
    onCreate,
    onGridViewSwitch,
    onSortChange,
    onUpload,
    view,
}: Props) => {
    const { sortBy, sortDirection, items = [] }: Collection = currentCollection;
    const isFolder: boolean = view === VIEW_FOLDER;
    const showSort: boolean = isFolder && items.length > 0;
    const showAdd: boolean = (!!canUpload || !!canCreateNewFolder) && isFolder;
    const showGridButton: boolean = isFolder && items.length > 0;

    return (
        <div className="be-sub-header-right">
            <FeatureFlag feature="contentExplorer.gridView.buttonVisible">
                {showGridButton && <GridViewButton isGridView={isGridView} onClick={onGridViewSwitch} />}
            </FeatureFlag>

            {showSort && !!sortBy && !!sortDirection && (
                <Sort onSortChange={onSortChange} sortBy={sortBy} sortDirection={sortDirection} />
            )}
            {showAdd && (
                <Add
                    isDisabled={!isFolder}
                    onCreate={onCreate}
                    onUpload={onUpload}
                    showCreate={canCreateNewFolder}
                    showUpload={canUpload}
                />
            )}
        </div>
    );
};

export default SubHeaderRight;
