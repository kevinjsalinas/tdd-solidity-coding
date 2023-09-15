import { ethers } from 'hardhat';
import { Bytecode } from 'hardhat/internal/hardhat-network/stack-traces/model';

async function main() {

    const accounts = await ethers.getSigners();
    const [deployer, acc1, acc2] = accounts;
    console.log(`The address of the deployer is ${deployer.address}`);
    const provider = ethers.provider;
    const lastBlock = await provider.getBlock("latest");
    console.log("The last block in this network is: \n");
    console.log({lastBlock});

    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`The balance of the deployer is ${ethers.formatUnits(deployerBalance)} ETH`);

    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();

    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`The address of the smart contract is ${helloWorldContractAddress}`)
    
    const helloWorldBytes = await helloWorldContract.helloWorld();
    const helloWorld = ethers.decodeBytes32String(helloWorldBytes);
    console.log(`The text stored in the contract is ${helloWorld}`);

}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});