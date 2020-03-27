import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [data, setData] = useState("");
  const [query, setQuery] = useState("Master Obiwan has lost a planet");
  const [url, setUrl] = useState(
    `https://api.funtranslations.com/translate/yoda.json?text=${query}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <div>
      <h1>Learn How to Speak Like Yoda</h1>
      <h2>
        The fan favourite Jedi Master has always had a special place in Star
        Wars fans heart
      </h2>
      <form className="translateForm">
        <input
          type="text"
          className="translateForm--input"
          name="userText"
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
        <button
          className="translateForm--button"
          onClick={() =>
            setUrl(
              `https://api.funtranslations.com/translate/yoda.json?text=${query}`
            )
          }
        >
          Translate Here!
        </button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <h3 className="translatedText">{data}</h3>
      )}
    </div>
  );
}

//onClick to take data from form and send it to url
//attach response to h3
