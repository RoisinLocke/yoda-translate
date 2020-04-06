import React, { useEffect, useState } from "react";
import axios from "axios";
import yoda from "../assets/yoda.svg";
import "../styles/Main.scss";

export default function Main() {
  const [data, setData] = useState("");
  const [query, setQuery] = useState("Master Obiwan has lost a planet");
  const [url, setUrl] = useState(
    `https://api.funtranslations.com/translate/yoda.json?text=${query}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log(query);
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        const translated = result.data.contents.translated;
        setData(translated);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div className="main">
      <img className="main--image" src={yoda} alt="Clipart display of Yoda" />
      <h1 className="main--title">Talk Like Yoda</h1>
      <h2>Ever wish you had the wisdom of one of the greatest Jedi Masters?</h2>
      <h2>Maybe it comes from the slow, methodical way he speaks!</h2>
      <h2>Try it below to see:</h2>
      <form
        className="main--translateForm"
        onSubmit={event => {
          setUrl(
            `https://api.funtranslations.com/translate/yoda.json?text=${query}`
          );
          event.preventDefault();
        }}
      >
        <textarea
          type="text"
          className="main--translateForm__input"
          name="userText"
          onChange={event => setQuery(event.target.value)}
          placeholder={query}
        />
        <button className="main--translateForm__button" type="submit">
          TRANSLATE
        </button>
      </form>
      {isError && <h2>Oh no, something went wrong! Please try again..</h2>}
      {isLoading ? (
        <h2>Loading ...</h2>
      ) : (
        <h3 className="main--translatedText">" {data} "</h3>
      )}
    </div>
  );
}
