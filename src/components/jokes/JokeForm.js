import { Fragment } from "react";
import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import Loader from "../UI/Loader";
import styles from "./JokeForm.module.css";

const JokeForm = (props) => {
  const topicInputRef = useRef();
  const textInputRef = useRef();
  const [isFormFocused, setIsFormFocused] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsFormFocused(true);

    // Компонент Prompt будет контроллировать, пытается ли пользователь перейти на другую страницу. По какому-то условию этот компонент может показывать предупреждение
    // Нужно указывать 2 пропса - 1 when (либо true - будет показываться в случае попытки пользователем покинуть страницу, либо false - не будет показываться в случае попытки пользователем покинуть страницу), 2 message (можем указать функцию, которая должна возвращать текст, который мы хотим показать пользователю. Функция получает параметр location. В этом объекте находится информация о странице, куда пользователь пытается перейти)
  };

  const sendDataHandler = () => {
    setIsFormFocused(false);
    // Мы могли бы это делать и в submitFormHandler, но мы не реакт сам  управляет состояниями, так что мы не можем быть уверены в том, что это состояние установится до того, как будет вызвана функция props.onAddJoke, которая перенаправляет нас на другую страницу
  };

  return (
    <Fragment>
      <Prompt
        when={isFormFocused}
        message={(location) =>
          "Do you really want to leave this page? If so you will lost all data in the form!"
        }
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={styles.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <Loader />
            </div>
          )}

          <div className={styles.control}>
            <label htmlFor="topic">Topic</label>
            <input type="text" id="topic" ref={topicInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button onClick={sendDataHandler} className="btn">
              Add Joke
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default JokeForm;
