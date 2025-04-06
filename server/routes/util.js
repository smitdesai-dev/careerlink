const register = require("../schemas/register");
const CompanyRegister = require("../schemas/company_register");

const authenticate = async (req) => {
  let userData = null;
  let status = null;
  let resData = null;
  let sessionid = req.body.sessionid || req.query.sessionid;
  console.log("auth : " + sessionid);
  if (sessionid) {
    const existingSession = await register.findOne({
      sessionId: sessionid,
    });
    if (!existingSession) {
      status = 401;
      resData = { isLoggedIn: false, message: "User not logged in" };
    } else userData = existingSession;
  } else {
    status = 401;
    resData = { isLoggedIn: false, message: "User not logged in" };
  }
  return [userData, status, resData];
};

const company_authenticate = async (req) => {
  let userData = null;
  let status = null;
  let resData = null;
  let sessionid = req.body.sessionid || req.query.sessionid;
  console.log("company auth : " + sessionid);
  if (sessionid) {
    const existingSession = await CompanyRegister.findOne({
      sessionId: sessionid,
    });
    if (!existingSession) {
      status = 401;
      resData = { isLoggedIn: false, message: "User not logged in" };
    } else userData = existingSession;
  } else {
    status = 401;
    resData = { isLoggedIn: false, message: "User not logged in" };
  }
  return [userData, status, resData];
};

module.exports = {
  authenticate: authenticate,
  company_authenticate: company_authenticate,
};
