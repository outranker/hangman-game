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

const getDefinition = async (word) => {
  if (word) {
    const response = await fetch(
      `https://hangman-api.javohirmirzo.fun/v1/hangman/get-word-definition?word=${word}`
    );
    return await response.json();
  } else {
    return;
  }
};
