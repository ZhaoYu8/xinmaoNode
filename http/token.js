import jwt from 'jsonwebtoken'
const secret = 'zhaoyu';
const obj = {
  createToken(username, id) {
    let token = jwt.sign({
      User: username,
      id: id
    }, secret, {
        expiresIn: "7 days"
      });
    return token;
  },
  verifyToken(_token) {
    let verify = jwt.verify(_token, secret, (error, decoded) => {
      if (error) {
        return false
      }
      return decoded;
    });
    return verify;
  }
}
export default obj