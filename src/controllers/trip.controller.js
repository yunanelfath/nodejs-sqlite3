let controller = {
  hello: async function(req, res){
    return res.send('hello world')
  }
}
module.exports = controller
