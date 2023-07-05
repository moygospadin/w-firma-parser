import { zalandoLogin, findSneakers } from "./src/zalando";
import { zalandoText } from "./src/consts/links";
const CREDS = {
  username: "00sneaz@gmail.com",
  password: "b399b1d619",
};
async function start() {
  const { page } = await zalandoLogin({ CREDS });
  await findSneakers(zalandoText.airForceText, page);
}
start();
