const { zalandoLogin } = require("./src/zalando");
const { zalandoText } = require("./src/consts/links");
const CREDS = {
  username: "lesha.belenko1337@gmail.com",
  password: "test1234test",
};
zalandoLogin(CREDS);
