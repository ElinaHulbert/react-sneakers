import { useEffect, useState } from "react";
import Render from "./components/Render";

const Fetch = () => {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch("https://mern-sneakers-app.herokuapp.com/sneakers", {
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
    <div>
      <Render sneakers={sneakers} />
    </div>
  );
};

export default Fetch;
