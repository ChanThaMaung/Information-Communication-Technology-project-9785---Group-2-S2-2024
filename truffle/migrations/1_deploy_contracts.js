const Verifier = artifacts.require("Verifier");
const Emitter = artifacts.require("Emitter");
const Issuer = artifacts.require("Issuer");

module.exports = function(deployer) {
  let emitterInstance, issuerInstance;

  deployer.deploy(Issuer)
    .then(() => Issuer.deployed())
    .then(_issuerInstance => {
      issuerInstance = _issuerInstance;
      return deployer.deploy(Emitter);
    })
    .then(() => Emitter.deployed())
    .then(_emitterInstance => {
      emitterInstance = _emitterInstance;
      return deployer.deploy(Verifier, emitterInstance.address, issuerInstance.address);
    });
};