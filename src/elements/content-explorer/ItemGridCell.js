// @flow
import * as React from 'react';
import classNames from 'classnames';
import getProp from 'lodash/get';
import getSize from '../../utils/size';
import MoreOptions from './MoreOptions';
import Date from './Date';
import Name from '../common/item/Name';
import { getIcon } from '../common/item/iconCellRenderer';
import type { ItemGridProps } from './flowTypes';
import './ItemGridCell.scss';

type Props = {
    item: BoxItem,
    ...$Exact<ItemGridProps>,
};

const ItemGridCell = ({
    canPreview,
    isSmall,
    isTouch,
    item,
    onItemClick,
    onItemSelect,
    rootId,
    view,
    ...rest
}: Props) => {
    isSmall = true;
    const url = getProp(item, `thumbnailUrl`);
    const itemClassName = classNames(
        'bce-ItemGridCell-item',
        { 'bce-ItemGridCell-item--postLoadThumbnail': url },
        { 'bce-ItemGridCell-item--itemIcon': !url },
    );
    return (
        <figure className="bce-ItemGridCell-figure">
            <div className="bce-ItemGridCell-itemThumbnail">
                {url ? (
                    <div className={itemClassName} style={{ backgroundImage: `url("${url}")` }} />
                ) : (
                    <div className={itemClassName}> {getIcon(128, item)} </div>
                )}
            </div>
            <figcaption className="bce-ItemGridCell-figcaption">
                <Name
                    canPreview={canPreview}
                    isTouch={isTouch}
                    item={item}
                    onItemClick={onItemClick}
                    onItemSelect={onItemSelect}
                    rootId={rootId}
                    showDetails={isSmall}
                    view={view}
                />
                {!isSmall && (
                    <React.Fragment>
                        <div>{getSize(item.size)}</div>
                        <Date dataKey="" item={item} />
                    </React.Fragment>
                )}
                <MoreOptions
                    canPreview={canPreview}
                    isSmall={isSmall}
                    item={item}
                    onItemSelect={onItemSelect}
                    {...rest}
                />
            </figcaption>
        </figure>
    );
};
export default ItemGridCell;
