// @flow
import * as React from 'react';
import IconPlusThin from '../../icons/general/IconPlusThin';
import IconMinusThin from '../../icons/general/IconMinusThin';
import PlainButton from '../plain-button/PlainButton';
import { bdlNeutral03 } from '../../styles/variables';
import './GridViewSlider.scss';

type Props = {
    columnCount: number,
    isTouch: boolean,
    maxColumnCount: number,
    minColumnCount: number,
    onChange: (newViewSize: number) => void,
};

const MAX_POSSIBLE_COLUMNS = 7;
const RANGE_STEP = 1;

const GridViewSlider = ({ columnCount, isTouch, maxColumnCount, minColumnCount, onChange }: Props) => {
    const RANGE_MIN = MAX_POSSIBLE_COLUMNS - maxColumnCount + 1;
    const RANGE_MAX = MAX_POSSIBLE_COLUMNS - minColumnCount + 1;

    const viewSize = RANGE_MAX - columnCount + 1;
    return (
        minColumnCount < maxColumnCount && (
            <div className="bdl-GridViewSlider">
                <PlainButton
                    className="bdl-GridViewSlider-PlainButton bdl-GridViewSlider-PlainButton--minus"
                    onClick={() => {
                        onChange(Math.max(RANGE_MIN, viewSize - RANGE_STEP));
                    }}
                >
                    <IconMinusThin color={bdlNeutral03} width={14} height={14} />
                </PlainButton>
                {!isTouch && (
                    <input
                        className="bdl-GridViewSlider-Range"
                        max={RANGE_MAX}
                        min={RANGE_MIN}
                        onChange={event => {
                            onChange(event.currentTarget.valueAsNumber);
                        }}
                        step={RANGE_STEP}
                        type="range"
                        value={viewSize}
                    />
                )}
                <PlainButton
                    className="bdl-GridViewSlider-PlainButton bdl-GridViewSlider-PlainButton--plus"
                    onClick={() => {
                        onChange(Math.min(RANGE_MAX, viewSize + RANGE_STEP));
                    }}
                >
                    <IconPlusThin color={bdlNeutral03} width={14} height={14} />
                </PlainButton>
            </div>
        )
    );
};

export default GridViewSlider;
