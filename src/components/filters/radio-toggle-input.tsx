import { useState } from 'react';

interface RadioToggleOption {
  key: string;
  displayValue: string;
}

interface RadioToggleInputProps {
  title: string;
  options: RadioToggleOption[];
  defaultSelected?: string;
  onChange?: (selectedKey: string) => void;
}

export const RadioToggleInput: React.FC<RadioToggleInputProps> = (props) => {
  const { options, title, defaultSelected, onChange } = props;
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <>
      <span className="create-training__label">{title}</span>
      <br />
      <div className="custom-toggle-radio create-training__radio">
        {options.map((option) => (
          <div key={option.key} className="custom-toggle-radio__block">
            <label>
              <input
                type="radio"
                name="sort"
                checked={option.key === selected}
                onChange={(evt) => {
                  if (evt.target.checked) {
                    setSelected(option.key);
                    onChange?.(option.key);
                  }
                }}
              />
              <span className="custom-toggle-radio__icon" />
              <span className="custom-toggle-radio__label">
                {option.displayValue}
              </span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
