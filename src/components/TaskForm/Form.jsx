import { useDispatch } from "react-redux";
import css from "./Form.module.css";
import { addToDo } from "../../redux/TODO/operations";
import { Button } from "../Button/Button";

const Form = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    dispatch(
      addToDo({
        id: Date.now(),
        text: form.elements.text.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        placeholder="type here..."
        name="text"
        required
        autoFocus
      />
      <Button className={css.buttonAdd} type="submit">
        Add new +
      </Button>
    </form>
  );
};

export default Form;
