import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Arthur',
    price: 23420,
    description: 'One sleepy head Arthur',
  });

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={resetForm}>
        Reset
      </button>
      <button type="button" onClick={clearForm}>
        Clear
      </button>
    </form>
  );
}
