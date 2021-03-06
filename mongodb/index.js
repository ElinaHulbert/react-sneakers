import express from "express";
import mongodb from "mongodb";
import cors from "cors";

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://ElinaHulbert:Lolilulela123@cluster0.gxsmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//Configuring the MongoClient to talk to our MongoDB
const mongoClient = new mongodb.MongoClient(MONGODB_URL);
//connect the client to database
mongoClient.connect();
//Grabbing the dogapi database
const db = mongoClient.db("react-sneakers");
//Picking the collection
const collection = db.collection("sneakers");
const collection2 = db.collection("cart");
const collection3 = db.collection("favourite");
const collection4 = db.collection("order");

const PORT = process.env.PORT || 8080;
const app = express();
const requestLogger = (request, response, next) => {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const url = request.url;
  const currentTimeMs = Date.now();
  const logString = `Timestamp: ${timestamp}, Method: ${method}, URL: ${url}`;

  request.on("end", () => {
    const elapsedTimeMS = Date.now() - currentTimeMs;
    console.log(`${logString}, elapsedTimeMS: ${elapsedTimeMS}ms`);
  });
  next();
};
app.use(requestLogger);
app.use(express.json()); //it's a middleware
app.use(cors({ origin: "*" }));

app.get("/sneakers", async (request, response) => {
  const query = request.query;
  let filter = {};
  console.log("query", query);
  //   if (query.containsPuppy !== undefined) {
  //     filter = { ...(filter.containsPuppy = query.containsPuppy === "false") };
  //     console.log("filter", filter);
  //   }
  //   if (query.breed) {
  //     filter.breed = query.breed;
  //     console.log("filter", filter);
  //   }
  const sneakers = await collection.find(filter).toArray();
  response.json(sneakers);
});

app.get("/sneakers", async (request, response) => {
  //   response.setHeader("Content-Type", "application/json").send(JSON.stringify(database)).end();
  const sneakers = await collection.find({}).toArray();
  response.json(sneakers);
});

app.get("/cart", async (request, response) => {
  const cart = await collection2.find({}).toArray();
  response.json(cart);
});

app.get("/favourite", async (request, response) => {
  const favourite = await collection3.find({}).toArray();
  response.json(favourite);
});

app.get("/order", async (request, response) => {
  const order = await collection4.find({}).toArray();
  response.json(order);
});

app.post("/sneakers", async (request, response) => {
  const sneakersPic = request.body;
  await collection.insertOne(sneakersPic);
  response.status(200).end();
  // response.sendStatus(200);
});

app.post("/cart", async (request, response) => {
  const cartPic = request.body;
  await collection2.insertOne(cartPic);
  response.status(200).end();
});

app.post("/favourite", async (request, response) => {
  const favouritePic = request.body;
  await collection3.insertOne(favouritePic);
  response.status(200).end();
});

app.post("/order", async (request, response) => {
  const cartPic = request.body;
  await collection4.insertOne(cartPic);
  response.status(200).end();
});

app.delete("/sneakers/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  console.log(theSelectedSneakersId + " deleted");
  const documentCount = await collection.count({
    _id: theSelectedSneakersId,
  });
  const sneakersExists = documentCount === 1;
  if (sneakersExists) {
    //When working with an autogenerated id
    // await collection.deleteOne({ _id: new mongodb.ObjectId(theSelectedDogId) });
    //We made our own id
    await collection.deleteOne({ _id: theSelectedSneakersId });
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.delete("/cart/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  console.log(theSelectedSneakersId + " deleted");
  const documentCount = await collection2.count({
    _id: theSelectedSneakersId,
  });
  const sneakersExists = documentCount === 1;
  if (sneakersExists) {
    //When working with an autogenerated id
    // await collection.deleteOne({ _id: new mongodb.ObjectId(theSelectedDogId) });
    //We made our own id
    await collection2.deleteOne({ _id: theSelectedSneakersId });
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.delete("/favourite/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  console.log(theSelectedSneakersId + " deleted");
  const documentCount = await collection3.count({
    _id: theSelectedSneakersId,
  });
  const sneakersExists = documentCount === 1;
  if (sneakersExists) {
    //When working with an autogenerated id
    // await collection.deleteOne({ _id: new mongodb.ObjectId(theSelectedDogId) });
    //We made our own id
    await collection3.deleteOne({ _id: theSelectedSneakersId });
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.delete("/order/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  console.log(theSelectedSneakersId + " deleted");
  const documentCount = await collection4.count({
    _id: theSelectedSneakersId,
  });
  const sneakersExists = documentCount === 1;
  if (sneakersExists) {
    //When working with an autogenerated id
    // await collection.deleteOne({ _id: new mongodb.ObjectId(theSelectedDogId) });
    //We made our own id
    await collection4.deleteOne({ _id: theSelectedSneakersId });
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

app.patch("/sneakers/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  const requestBody = request.body;
  await collection.updateOne(
    { _id: theSelectedSneakersId },
    { $set: requestBody }
  );
  response.status(200).end();
});

app.patch("/cart/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  const requestBody = request.body;
  await collection2.updateOne(
    { _id: theSelectedSneakersId },
    { $set: requestBody }
  );
  response.status(200).end();
});

app.patch("/favourite/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  const requestBody = request.body;
  await collection3.updateOne(
    { _id: theSelectedSneakersId },
    { $set: requestBody }
  );
  response.status(200).end();
});

app.patch("/order/:sneakersId", async (request, response) => {
  const theSelectedSneakersId = request.params.sneakersId;
  const requestBody = request.body;
  await collection4.updateOne(
    { _id: theSelectedSneakersId },
    { $set: requestBody }
  );
  response.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Project is up and running @ http://localhost:${PORT}`);
});
