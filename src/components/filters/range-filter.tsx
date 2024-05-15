import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface RangeFilterProps {
  title: string;
  defaultMin: number;
  defaultMax: number;
  min: number;
  max: number;
  step?: number;
  hideValueInputs?: boolean;
  showOutputs?: boolean;
  onChange?: (values: [number, number]) => void;
}

export const RangeFilter: React.FC<RangeFilterProps> = (props) => {
  const {
    defaultMin,
    defaultMax,
    min,
    max,
    step,
    onChange,
    title,
    hideValueInputs,
    showOutputs,
  } = props;
  const [values, setValues] = useState([defaultMin, defaultMax]);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--price">
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      {!hideValueInputs && (
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              name="text-min"
              value={values[0]}
              onChange={(e) => {
                const newValues = [Number(e.target.value), values[1]];
                setValues(newValues);
                onChange?.(newValues as [number, number]);
              }}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              name="text-max"
              value={values[1]}
              onChange={(e) => {
                const newValues = [values[0], Number(e.target.value)];
                setValues(newValues);
                onChange?.(newValues as [number, number]);
              }}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
      )}
      <div
        className="filter-range"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          onChange={(changedValues) => {
            setValues(changedValues);
            onChange?.(changedValues as [number, number]);
          }}
          renderTrack={({ props, children }) => (
            <div
              className="filter-range__scale"
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                className="filter-range__bar"
                ref={props.ref}
                style={{
                  width: '100%',
                  background: getTrackBackground({
                    values,
                    colors: ['#aeaeae', 'black', '#aeaeae'],
                    min,
                    max,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className="filter-range__min-toggle"
              {...props}
              style={{
                ...props.style,
                transition: 'none',
                top: '50%',
              }}
            ></div>
          )}
        />
      </div>
      {showOutputs && (
        <div
          style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};
