import { take } from 'lodash';
import { useState } from 'react';

interface Option {
  key: string;
  displayValue: string;
}

interface CheckboxFilterProps {
  title: string;
  options: Option[];
  showMoreButton?: boolean;
  showMoreMaxItems?: number;
  defaultSelected?: string[];
  onChange?: (selectedKeys: string[]) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = (props) => {
  const {
    options,
    title,
    defaultSelected,
    onChange,
    showMoreButton,
    showMoreMaxItems = 5,
  } = props;
  const [selected, setSelected] = useState(defaultSelected || []);
  const [showAllOptions, setShowAllOptions] = useState(false);

  const optionsToDisplay = showAllOptions
    ? options
    : take(options, showMoreMaxItems);

  const showShowMoreButton =
    !showAllOptions && showMoreButton && options.length > showMoreMaxItems;

  return (
    <>
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      <ul className="gym-catalog-form__check-list">
        {optionsToDisplay.map((option) => (
          <li
            key={option.key}
            className="gym-catalog-form__check-list-item"
            style={{ marginBottom: 5 }}
          >
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(option.key)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selected, option.key]
                      : selected.filter((key) => key !== option.key);
                    setSelected(newSelected);
                    onChange?.(newSelected);
                  }}
                />
                <span className="custom-toggle__icon">
                  <svg width={9} height={6} aria-hidden="true">
                    <use xlinkHref="#arrow-check" />
                  </svg>
                </span>
                <span className="custom-toggle__label">
                  {option.displayValue}
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      {showShowMoreButton && (
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={() => setShowAllOptions(true)}
        >
          <span>Посмотреть все</span>
          <svg
            className="btn-show-more__icon"
            width={10}
            height={4}
            aria-hidden="true"
          >
            <use xlinkHref="#arrow-down" />
          </svg>
        </button>
      )}
    </>
  );
};
