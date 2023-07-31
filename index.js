const express     =     require('express');
const bodyParser  =     require('body-parser');

const app = express();

const Todo =require("./routes/website.router");
app.use(bodyParser.json());
app.use("/",Todo)
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Todo List API server is running on http://localhost:${port}`);
});
