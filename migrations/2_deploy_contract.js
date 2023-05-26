const DocumentSignature = artifacts.require("DocumentSignature");

module.exports = function(deployer) {
  deployer.deploy(DocumentSignature);
};