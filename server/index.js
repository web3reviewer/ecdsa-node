const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c546a8b319fe401b680f795047f5472a5cb6521a012b63ab0a6c92de2c5f522c987c17b6e7b3359c94b33a261eefeb701a501a1e57613ff07bce563b427084df": 100,
  "048cf5078e2be58b50ffe47a85880bd2e3d67921b419fe4b79a019f63ec6472886359ab46118d7b7b11553ef399923c6d58e2bb10d6089aa7ca4b1317b0a37dab0": 50,
  "04958560e82722ac4fd157b656ee4aa2fa558ecdd4c587e618b2776d7317956a5a4d9194ab6e6f92d584782874827ca35ac6c6c7e7ccf7cf9e0444f7a3eb97f858": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO: get a signature from the client side and recover the public address from the signature
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
