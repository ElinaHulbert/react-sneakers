import { useEffect, useState } from "react";
import Render from "./components/Render";


const Fetch = () => {
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
    <div>
        <Render sneakers={sneakers}/>
    </div>
  );
};




export default Fetch;
