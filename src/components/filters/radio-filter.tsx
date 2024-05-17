import { useState } from 'react';

interface RadioFilterProps {
  title?: string;
  options: string[];
  defaultSelected?: string;
  onChange?: (selectedKey: string) => void;
}

export const RadioFilter: React.FC<RadioFilterProps> = (props) => {
  const { options, title, defaultSelected, onChange } = props;
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <>
      {title && (
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
          {title}
        </h4>
      )}
      <div className="btn-radio-sort gym-catalog-form__radio">
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="sort"
              checked={option === selected}
              onChange={(evt) => {
                if (evt.target.checked) {
                  setSelected(option);
                  onChange?.(option);
                }
              }}
            />
            <span className="btn-radio-sort__label">{option}</span>
          </label>
        ))}
      </div>
    </>
  );
};
