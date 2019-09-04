let obj = {
  upload(param) {
    return new Promise((resolve, reject) => {
      console.log(param);
      resolve({})
    })
  }
}
export default obj