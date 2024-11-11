let httpReq;
let httpRes;

const setReqRes = (req, res) => {
  httpReq = req;
  httpRes = res;
};
const setReq = (newReq)=>{
  httpReq = newReq
}
const getReq = () => httpReq;
const getRes = () => httpRes;

module.exports = { setReqRes, getReq, getRes, setReq };