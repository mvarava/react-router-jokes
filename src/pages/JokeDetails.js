import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedJoke from "../components/jokes/HighlightedJoke";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";
import { useEffect } from "react";
import Loader from "../components/UI/Loader";

// const DUMMY_JOKES = [
//   {
//     id: "j1",
//     topic: "Programming",
//     text: "How many programmers does it take to change a light bulb? None - It's a hardware problem",
//   },
//   {
//     id: "j2",
//     topic: "General",
//     text: "How many bones are in the human hand? A handfull of them",
//   },
// ];

const JokeDetails = () => {
  const routeMatch = useRouteMatch();
  const params = useParams();
  const { jokeId } = params;

  const {
    sendHttpRequest,
    status,
    data: loadedJoke,
    error,
  } = useHttp(getJoke, true);

  // const joke = DUMMY_JOKES.find((joke) => joke.id === params.jokeId);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedJoke.text) {
    return <h1 className="centered">No Jokes Found</h1>;
  }

  // useRouteMatch похож на useLocation, но в этом объекте есть больше информации о пути, по которому загрузился компонент. Есть информация не только о самом url, но и внутрення информация

  return (
    <section>
      <HighlightedJoke text={loadedJoke.text} topic={loadedJoke.topic} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--empty" to={`${routeMatch.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>
      <Route path={`${routeMatch.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};
export default JokeDetails;
