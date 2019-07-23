// @flow
import * as React from 'react';
import IconPlusThin from '../../icons/general/IconPlusThin';
import IconMinusThin from '../../icons/general/IconMinusThin';
import PlainButton from '../plain-button/PlainButton';
import { bdlNeutral03 } from '../../styles/variables';
import './GridViewSlider.scss';

type Props = {
    columnCount: number,
    maxColumnCount: number,
    minColumnCount: number,
    onChange: (newViewSize: number) => void,
};

const RANGE_STEP = 1;

function GridViewSlider({ columnCount, maxColumnCount, minColumnCount, onChange }: Props) {
    const viewSize = maxColumnCount - columnCount + 1;
    return (
        <div className="bdl-GridViewSlider">
            <PlainButton
                className="bdl-GridViewSlider-MinusButton"
                onClick={() => {
                    onChange(Math.max(minColumnCount, viewSize - RANGE_STEP));
                }}
            >
                <IconMinusThin color={bdlNeutral03} width={14} height={14} />
            </PlainButton>
            <input
                className="bdl-GridViewSlider-Range"
                max={maxColumnCount}
                min={minColumnCount}
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
                    onChange(Math.min(maxColumnCount, viewSize + RANGE_STEP));
                }}
            >
                <IconPlusThin color={bdlNeutral03} width={14} height={14} />
            </PlainButton>
        </div>
    );
}

export default GridViewSlider;
