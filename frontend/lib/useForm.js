import { useEffect, useState } from 'react';

export default function useForm(intial = {}) {
  const [inputs, setInputs] = useState(intial);
  // convert the intial values in to a string and we will watch for tis to change in the useEffect
  const initialValues = Object.values(intial).join('');

  useEffect(() => {
    // this function runs when what we are watching changes
    setInputs(intial);
  }, [initialValues]);

  function handleChange(e) {
    const { type, name, value } = e.target;

    let modValue = value;
    if (type === 'number') modValue = parseInt(value);
    if (type === 'file') [modValue] = e.target.files;

    setInputs({
      // copy existing state
      ...inputs,
      // add/update new state
      [name]: modValue,
    });
  }

  function resetForm() {
    setInputs(intial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  // return the thing we want to surface
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
