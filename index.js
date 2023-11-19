const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/jwt_verify");
const BankData = require("./model/bank_data");

const app = express();
app.use(express.json());

const url = (database_url =
  "mongodb+srv://guiguimarcel51:senha1ncorreta@microsservicesapi.6lhi2h1.mongodb.net/?retryWrites=true&w=majority");

mongoose.connect(url, { useUnifiedTopology: true });

app.post("/api/bank-data/add", auth, (req, res) => {
  const data = new BankData(req.body);
  data
    .save()
    .then((data) => {
      res.status(201).send({ output: `New bank data inserted`, payload: data });
    })
    .catch((erro) =>
      res.status(400).send({ output: `Insertion Fail -> ${erro}` })
    );
});

app.put("/api/bank-data/update/:id", auth, (req, res) => {
  const id = req.params.id;
  const updateBankData = req.body

  try{
    BankData.findOneAndUpdate({ _id: id }, updateBankData, {new: true}).then((data) => {
      if (!data) return res.status(400).send({ output: `Find bank data error` });
        res.status(201).send({ output: `Bank data updated`, payload: data });
      })
    }catch(error){
      res.status(400).send({ output: `Bank data update change Fail -> ${error}` })
    }
});

app.listen(5566, () => console.log(`Servidor online in http://localhost:5566`));
