router.get("/", async (req, res) => {
  let artDict = await artModel.find().lean().exec().result;
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});
