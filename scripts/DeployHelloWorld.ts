import { ethers } from 'ethers';
import 'dotenv/config'
import { HelloWorld__factory } from '../typechain-types';

async function main() {


    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) throw new Error('Invalid RPC URL');
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const lastBlock = await provider.getBlock("latest");
    console.log("The last block in this network is: \n");
    console.log({lastBlock});

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length !=64) throw new Error
    ("Invalid Private Key");
    const deployer = new ethers.Wallet(privateKey, provider);
    console.log(`The address of the deployer is ${deployer.address}`);
    
    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`The balance of the deployer is ${ethers.formatUnits(deployerBalance)} BNB`);
    
    const helloWorldFactory = new HelloWorld__factory(deployer);
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();
    
    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`The address of the smart contract is ${helloWorldContractAddress}`)
    
    const helloWorldBytes = await helloWorldContract.helloWorld();
    const helloWorld = ethers.decodeBytes32String(helloWorldBytes);
    console.log(`The text stored in the contract is ${helloWorld}`);

    // const accounts = await ethers.getSigners();
    // const [deployer, acc1, acc2] = accounts;
    // const provider = ethers.provider;





}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});