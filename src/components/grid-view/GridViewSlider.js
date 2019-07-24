// @flow
import * as React from 'react';
import IconPlusThin from '../../icons/general/IconPlusThin';
import IconMinusThin from '../../icons/general/IconMinusThin';
import PlainButton from '../plain-button/PlainButton';
import { GRID_VIEW_MAX_COLUMNS } from '../../constants';
import { bdlNeutral03 } from '../../styles/variables';
import './GridViewSlider.scss';

type Props = {
    columnCount: number,
    isTouch: boolean,
    maxColumnCount: number,
    onChange: (newSliderValue: number) => void,
};

const GridViewSlider = ({ columnCount, isTouch, maxColumnCount, onChange }: Props) => {
    const GRID_VIEW_MIN_COLUMNS = 1;
    const RANGE_STEP = 1;
    const RANGE_MIN = GRID_VIEW_MAX_COLUMNS - maxColumnCount + 1;
    const RANGE_MAX = GRID_VIEW_MAX_COLUMNS - GRID_VIEW_MIN_COLUMNS + 1;

    const sliderValue = RANGE_MAX - columnCount + 1;
    return (
        GRID_VIEW_MIN_COLUMNS < maxColumnCount && (
            <div className="bdl-GridViewSlider">
                <PlainButton
                    className="bdl-GridViewSlider-PlainButton bdl-GridViewSlider-PlainButton--minus"
                    onClick={() => {
                        onChange(Math.max(RANGE_MIN, sliderValue - RANGE_STEP));
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
                        value={sliderValue}
                    />
                )}
                <PlainButton
                    className="bdl-GridViewSlider-PlainButton bdl-GridViewSlider-PlainButton--plus"
                    onClick={() => {
                        onChange(Math.min(RANGE_MAX, sliderValue + RANGE_STEP));
                    }}
                >
                    <IconPlusThin color={bdlNeutral03} width={14} height={14} />
                </PlainButton>
            </div>
        )
    );
};

export default GridViewSlider;
