// @flow
import * as React from 'react';
import IconPlusThin from '../../icons/general/IconPlusThin';
import IconMinusThin from '../../icons/general/IconMinusThin';
import PlainButton from '../plain-button/PlainButton';
import './GridViewSlider.scss';

type Props = {
    columnCount: number,
    onChange: (newViewSize: number) => void,
};

const RANGE_MAX = 7;
const RANGE_MIN = 1;
const RANGE_STEP = 1;

function GridViewSlider({ onChange, columnCount }: Props) {
    const viewSize = RANGE_MAX - columnCount + 1;
    return (
        <div className="bdl-GridViewSlider">
            <PlainButton
                className="bdl-GridViewSlider-MinusButton"
                onClick={() => {
                    onChange(Math.max(RANGE_MIN, viewSize - RANGE_STEP));
                }}
            >
                <IconMinusThin width={14} height={14} />
            </PlainButton>
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
            <PlainButton
                className="bdl-GridViewSlider-PlusButton"
                onClick={() => {
                    onChange(Math.min(RANGE_MAX, viewSize + RANGE_STEP));
                }}
            >
                <IconPlusThin width={14} height={14} />
            </PlainButton>
        </div>
    );
}

export default GridViewSlider;
