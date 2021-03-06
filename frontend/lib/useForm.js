import { useState } from 'react';

export default function useForm(intial = {}) {
  const [inputs, setInputs] = useState(intial);

  function handleChange(e) {
    const { type, name, value } = e.target;

    let modValue = value;
    if (type === 'number') modValue = parseInt(value);
    if (type === 'file') modValue[0] = e.target.files;

    setInputs({
      // copy existing state
      ...inputs,
      // add/update new state
      [name]: modValue,
    });
    console.log(inputs);
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
