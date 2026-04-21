import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import css from "./Selector.module.css";

const Selector = ({
  label,
  options = [],
  value,
  onChange,
  id,
  defaultLabel = "Select option",
  displayValue,
  isLoading = false,
  className = "",
  fieldClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = (optionValue, event) => {
    event.stopPropagation();
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = value
    ? displayValue?.(value) ?? options.find((opt) => opt.value === value)?.label ?? value
    : defaultLabel;

  return (
    <div className={`${css.wrapper} ${className}`} ref={wrapperRef}>
      {label && (
        <label className={css.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`${css.selectWrapper} ${label ? css.withLabel : ""}`} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={`${css.fieldBase} ${css.select} ${fieldClassName}`} id={id}>
          {selectedLabel}  <span className={`${css.icon} ${isOpen ? css.iconOpen : ""}`}>
    <SlArrowDown />
  </span>
        </div>

        {isOpen && (
          <ul className={css.dropdown}>
            {isLoading ? (
              <li className={css.option}>Loading...</li>
            ) : (
              options.map((opt) => (
                <li
                  key={opt.value}
                  className={css.option}
                  onClick={(event) => handleSelect(opt.value, event)}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Selector;