import jwt from 'jsonwebtoken'
const secret = 'zhaoyu';
const obj = {
  createToken(username, id, expires, strTimer){
    let token = jwt.sign({
        User: username,
        id: id
    }, secret, {
        expiresIn: expires + " " + strTimer
    });
    return token;
  },
  verifyToken(_token) {
    let verify = jwt.verify(_token, secret, (error, decoded) => {
        if(error) {
            return "Token 过期了";
        }
        return decoded;
    });
    return verify;
  }
}
export default obj