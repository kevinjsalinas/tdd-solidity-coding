// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {

    bytes32 text;
    address public owner;

    constructor() {
        text = bytes32("Hello World!");
        owner = msg.sender;
    }

    function helloWorld() external view returns(bytes32) {
        return text;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "Caller is not the owner");
        owner = newOwner;

    } 

    function setText(bytes32 newText) external {
        text = newText;
    }

}
