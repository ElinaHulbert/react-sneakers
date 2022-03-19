import { useEffect, useState } from "react";


export const SneakersList = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/sneakers", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setSneakers(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ul>
      {sneakers.map((sneakers) => (
        console.log("result: ", sneakers)
      ))}
    </ul>
  );
};