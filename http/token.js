import jwt from 'jsonwebtoken'
const secret = 'zhaoyu';
const createToken = (username, plat, expires, strTimer) => {
  let token = jwt.sign({
      User: username,
      Plat: plat
  }, secret, {
      expiresIn: expires + " " + strTimer
  });
  return token;
}
export default createToken