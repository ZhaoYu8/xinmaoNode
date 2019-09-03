import jwt from 'jsonwebtoken'
const secret = 'zhaoyu';
const obj = {
  createToken(id, company) {
    let token = jwt.sign({
      id: id,
      company: company
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