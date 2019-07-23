/**
 * @flow
 * @file Content sub header component
 * @author Box
 */

import React from 'react';
import Sort from './Sort';
import Add from './Add';
import GridViewSlider from '../../../components/grid-view/GridViewSlider';
import ViewModeChangeButton from './ViewModeChangeButton';
import { FeatureFlag } from '../feature-checking';
import { VIEW_FOLDER } from '../../../constants';
import type { ViewMode } from '../flowTypes';
import './SubHeaderRight.scss';

type Props = {
    canCreateNewFolder: boolean,
    canUpload: boolean,
    currentCollection: Collection,
    gridColumnCount: number,
    maxGridColumnCount: number,
    minGridColumnCount: number,
    onCreate: Function,
    onGridViewSliderChange: (newViewSize: number) => void,
    onSortChange: Function,
    onUpload: Function,
    onViewModeChange?: (viewMode: ViewMode) => void,
    view: View,
    viewMode: ViewMode,
};

const SubHeaderRight = ({
    canCreateNewFolder,
    canUpload,
    currentCollection,
    gridColumnCount,
    maxGridColumnCount,
    minGridColumnCount,
    onGridViewSliderChange,
    onCreate,
    onViewModeChange,
    onSortChange,
    onUpload,
    view,
    viewMode,
}: Props) => {
    const { sortBy, sortDirection, items = [] }: Collection = currentCollection;
    const hasItems: boolean = items.length > 0;
    const isFolder: boolean = view === VIEW_FOLDER;
    const showSort: boolean = isFolder && hasItems;
    const showAdd: boolean = (!!canUpload || !!canCreateNewFolder) && isFolder;
    const showGridButton: boolean = isFolder && hasItems;
    const showGridSlider: boolean = isFolder && hasItems;

    return (
        <div className="be-sub-header-right">
            <FeatureFlag feature="contentExplorer.gridView.enabled">
                {showGridSlider && (
                    <GridViewSlider
                        columnCount={gridColumnCount}
                        maxColumnCount={maxGridColumnCount}
                        minColumnCount={minGridColumnCount}
                        onChange={onGridViewSliderChange}
                    />
                )}
                {showGridButton && <ViewModeChangeButton viewMode={viewMode} onViewModeChange={onViewModeChange} />}
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
