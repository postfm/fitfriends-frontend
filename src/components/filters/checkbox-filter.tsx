import { useState } from 'react';

interface Option {
  key: string;
  displayValue: string;
}

interface CheckboxFilterProps {
  title: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selectedKeys: string[]) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = (props) => {
  const { options, title, defaultSelected, onChange } = props;
  const [selected, setSelected] = useState(defaultSelected || []);

  return (
    <>
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      <ul className="gym-catalog-form__check-list">
        {options.map((option) => (
          <li
            key={option.key}
            className="gym-catalog-form__check-list-item"
            style={{ marginBottom: 5 }}
          >
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  // name={option.key}
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
    </>
  );
};
