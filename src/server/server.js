import express from "express";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import {App} from "../App";
import axios from "axios";
const app = express();

app.use("/static", express.static("./dist/client"));

app.get("/auth", (req, res) => {
  console.log(req.query.code);
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
    {
      auth: { username: process.env.CLIENT_ID, password: "9l8m04uaSdEA4-FK2IB_sXbxo2MA_w" },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )
    .then(({data}) => {
      console.log(data);
      res.send(
        indexTemplate(ReactDOM.renderToString(App()), data['access_token']),
      );
    })
})

app.get("*", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
