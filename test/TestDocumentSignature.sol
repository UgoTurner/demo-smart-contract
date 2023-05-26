// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DocumentSignature.sol";

contract TestDocumentSignature {

    function testItSigns() public {
        // Get the deployed contract
        DocumentSignature documentSignature = DocumentSignature(DeployedAddresses.DocumentSignature());

        // Call sign function in deployed contract
        documentSignature.sign(address(this), "SGVsbG8gd29ybGQ="); // ex: 0x4aCEd824D10340Ec2e3C325258c1f0aF44D35059
        
        // Assert document is signed
        Assert.equal(documentSignature.isSignedBy(address(this), "SGVsbG8gd29ybGQ="), true, "Must be true");
    }
}