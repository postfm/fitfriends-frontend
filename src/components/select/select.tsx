import SelectInput from 'react-select';

interface SelectProps {
  title: string;
  options: { value: string; label: string }[];
  value: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  title,
  isDisabled,
  value,
  onChange,
}) => (
  <div className="custom-select user-info-edit__select">
    <span className="custom-select__label">{title}</span>
    <SelectInput
      className="custom-select__button"
      value={options.find((o) => o.value === value)}
      isSearchable={false}
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
