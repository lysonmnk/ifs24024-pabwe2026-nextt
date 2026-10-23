import { useState } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = (newValue = initialValue) => {
    setValue(newValue);
  };

  return {
    value,
    setValue,
    onChange,
    reset,
    bind: {
      value,
      onChange
    }
  };
};
