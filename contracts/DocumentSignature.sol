// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.13 <0.9.0;

contract DocumentSignature {
    struct Document {
        bytes32 hash;
        address[] signers;
    }

    mapping(bytes32 => Document) private documents;
    mapping(bytes32 => bool) private documentsExists;

    function sign(address account, string memory base64) public {
        // Calculate the hash of the URL using the hashDocument().
        bytes32 hash = hashDocument(base64);

        // Create a new Document struct in the documents mapping with the hash and an empty list of signers.
        if(!documentsExists[hash]) {
            documents[hash] = Document({
                hash: hash,
                signers: new address[](0)
            });
            documentsExists[hash] = true;
        }

        // Add the account address to the signers list of the corresponding Document struct. 
        documents[hash].signers.push(account);
    }

    function isSignedBy(address account, string memory base64) public view returns (bool) {
        // Calculate the hash of the URL using the hashDocument().
        bytes32 hash = hashDocument(base64);

        // Check if the document exists in the documentsExists mapping.
        if(!documentsExists[hash]) {
            return false;
        }

        /*
        * If the document exists, the function iterates through the list of signers for that document and 
        * returns true if the account address is found in the list, otherwise, it returns false.
        */
        for (uint i = 0; i < documents[hash].signers.length; i++) {
            if(documents[hash].signers[i] == account) {
                return true;
            }
        }

        return false;
    }

    function hashDocument(string memory _document) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_document));
    }
}