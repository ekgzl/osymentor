// server.js sunucuyu başlatan yer
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
