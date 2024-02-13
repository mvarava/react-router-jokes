import JokeForm from "../components/jokes/JokeForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addJoke } from "../utils/firebase-api";
import { useEffect } from "react";

const AddJoke = () => {
  const history = useHistory();
  const { sendHttpRequest, status } = useHttp(addJoke);

  useEffect(() => {
    if (status === "completed") {
      history.push("/jokes");
    }
  }, [status, history]);

  const addJokeHandler = (jokeData) => {
    sendHttpRequest(jokeData);
    // Мы можем программно в нашем коде перенаправлять пользователя в какую-то точку нашего приложения. Это действие программно может запускаться, например, по окончанию какого-то другого действия (к примеру, после того, как запрос с данными отправлен на сервер)
    // useHistory - назван так потому, что мы как бы будем менять историю посещенных страниц
    // при помощи метода push мы можем запушить новую страницу как поверх всех посещенных пользователем страниц
    // Либо можем использовать метод replace. При помощи этого метода мы меняем текущую страницу на ту, которую мы укажем. То есть она не будет добавлена сверху стека историй, а просто последняя страница будет заменена на ту, что мы укажем
    // Разница в том, что, если мы используем push, то тогда страница, с которой мы перенаправимся останется в истории, и при помощи стрелочки в браузере мы сможем на нее вернуться. При использовании метода replace мы уже на нее не попадем
    // history.push("/jokes");
  };

  return (
    <JokeForm isLoading={status === "pending"} onAddJoke={addJokeHandler} />
  );
};

export default AddJoke;
