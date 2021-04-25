const getPuzzle = async (wordCount) => {
  await getDefinition();
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error("Unable to get puzzle");
  }
};

const getCountry = async (countryCode) => {
  const response = await fetch(`//restcountries.eu/rest/v2/all`);
  if (response.status === 200) {
    const data = await response.json();
    return data.find((country) => country.alpha2Code === countryCode);
  } else {
    throw new Error("Unable to fetch data");
  }
};

const getLocation = async () => {
  const response = await fetch("//ipinfo.io/json?token=078434010929a4");
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Unable to fetch the data");
  }
};

const getDefinition = async (word, type) => {
  const app_id = "id"; //"my_app_id"; // insert your APP Id
  const app_key = "key"; //"my_app_key"; // insert your APP Key
  const wordId = "ace";
  const fields = "pronunciations";
  const strictMatch = "false";
  const options = {
    host: "od-api.oxforddictionaries.com",
    port: "443",
    path:
      "/api/v2/entries/en-gb/" +
      wordId +
      "?fields=" +
      fields +
      "&strictMatch=" +
      strictMatch,
    method: "GET",
    headers: {
      app_id: app_id,
      app_key: app_key,
    },
  };
  //   if (type === "adjective") {
  const response = await fetch(
    "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/ace?strictMatch=false",
    {
      method: "GET",
      mode: "no-cors",
      Accept: "application/json",
      headers: {
        app_id: "id",
        app_key: "key",
      },
    }
  );
  console.log("this is response definition", response);
  //   } else {
  //   }
};
