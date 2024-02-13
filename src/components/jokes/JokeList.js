import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import JokeItem from "./JokeItem";
import styles from "./JokeList.module.css";

const sortJokes = (jokes, isAscending) => {
  return jokes.sort((joke1, joke2) => {
    if (isAscending) {
      return joke1.id > joke2.id ? 1 : -1;
    } else {
      return joke1.id < joke2.id ? 1 : -1;
    }
  });
};

// При вызове хука useLocation объект позвoляет нам считывать данные из url страницы, на которой мы сейчас находимся
const JokeList = (props) => {
  const history = useHistory();
  const location = useLocation();

  // Создаем новый объект поиска параметров url. Передаем сюда объект location, обращаемся к его свойству search. При вызове этого конструктора мы можем получить параметры запроса передав в него location.search
  // Из нового объекта queryParams мы можем получать значение по названию параметра (значение sort, значение asc)
  const queryParams = new URLSearchParams(location.search);
  const sortingOrder = queryParams.get("sort");
  const isSortingAscending = sortingOrder === "asc";
  const sortedJokes = sortJokes(props.jokes, isSortingAscending);

  const toggleSortingHandler = () => {
    // Программное перенаправление можно задавать объектом вместо строки
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
    // history.push(
    //   `${location.pathname}?sort=` + (isSortingAscending ? "desc" : "asc")
    // );
    // Метод push приводит к перерисовке компонента
  };

  return (
    <Fragment>
      <div className={styles.sort}>
        <button onClick={toggleSortingHandler}>
          Sort Jokes {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={styles.list}>
        {props.jokes.map((joke) => (
          <JokeItem
            key={joke.id}
            id={joke.id}
            topic={joke.topic}
            text={joke.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default JokeList;
