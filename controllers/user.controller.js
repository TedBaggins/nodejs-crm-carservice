exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
};
  
exports.masterBoard = (req, res) => {
    res.status(200).send("Master Content.");
};