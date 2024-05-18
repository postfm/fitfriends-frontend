import SelectInput from 'react-select';
import './select-input.css';

interface SelectProps {
  title: string;
  options: { value: string; label: string }[];
  value: string;
  isDisabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  title,
  isDisabled,
  value,
  onChange,
  required,
}) => (
  <div className="custom-select user-info-edit__select">
    <span className="custom-select__label">{title}</span>
    <SelectInput
      className="custom-select__button"
      classNamePrefix={'react-select'}
      value={options.find((o) => o.value === value)}
      isSearchable={false}
      required={required}
      isDisabled={isDisabled}
      isClearable={false}
      isRtl={false}
      options={options}
      onChange={(value) => {
        if (value) {
          onChange?.(value.value);
        }
      }}
    />
  </div>
);

export default Select;
