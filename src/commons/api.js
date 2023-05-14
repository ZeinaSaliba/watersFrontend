
const host = "localhost";
const port = "3003";

export function getIP() {
  return `http://${host}:${port}/`;
}
const sanitize = obj => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    }),
  );
};

export function getRequest(path, then, catchError) {
    // console.log(`calling ${getIP()}api/${path}`)
    fetch(`${getIP()}api/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        then(sanitize(json));
      })
      .catch((error) => {
        catchError(error);
      });
}

export function postRequest(path, body, then, catchError) {
    // console.log(`calling ${getIP()}api/${path}`)
    fetch(`${getIP()}api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        then(sanitize(json));
      })
      .catch((error) => {
        catchError(error);
      });
}


