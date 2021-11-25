const TTT = artifacts.require('TTT.sol');
const assert = require('assert');

contract('TTT', accounts => {
    it("Should fail because the address not in whitelist", async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(50);
        let contractAddress = ttt.address;
        let buyingValue = '2000000000000000000';
        assert.rejects(web3.eth.sendTransaction({ from: accounts[0], to: contractAddress, value: buyingValue }));
    });

    it("Should fail because ICO isn't started", async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(1);
        await ttt.addToWhitelist(accounts[1]);
        let contractAddress = ttt.address;
        let buyingValue = '2000000000000000000';
        assert.rejects(web3.eth.sendTransaction({ from: accounts[1], to: contractAddress, value: buyingValue }));
    });

    it('Should buy tokens at first term of ICO', async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(45);
        await ttt.addToWhitelist(accounts[2]);
        let contractAddress = ttt.address;
        let buyingValue = '2000000000000000000';
        await web3.eth.sendTransaction({ from: accounts[2], to: contractAddress, value: buyingValue });
        let tttBalance = await ttt.balanceOf(accounts[2]);
        assert.equal(tttBalance.toString(), '84000000000000000000');
    });

    it('Should buy tokens at second term of ICO', async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(50);
        await ttt.addToWhitelist(accounts[3]);
        let contractAddress = ttt.address;
        let buyingValue = '3000000000000000000';
        await web3.eth.sendTransaction({ from: accounts[3], to: contractAddress, value: buyingValue });
        let tttBalance = await ttt.balanceOf(accounts[3]);
        assert.equal(tttBalance.toString(), '63000000000000000000');
    });

    it('Should buy tokens at third term of ICO', async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(80);
        await ttt.addToWhitelist(accounts[4]);
        let contractAddress = ttt.address;
        let buyingValue = '10000000000000000000';
        await web3.eth.sendTransaction({ from: accounts[4], to: contractAddress, value: buyingValue });
        let tttBalance = await ttt.balanceOf(accounts[4]);
        assert.equal(tttBalance.toString(), '80000000000000000000');
    });

    it("Should fail because ICO already finished", async () => {
        let ttt = await TTT.deployed();
        await ttt.setCurrentDay(100);
        await ttt.addToWhitelist(accounts[5]);
        let contractAddress = ttt.address;
        let buyingValue = '2000000000000000000';
        assert.rejects(web3.eth.sendTransaction({ from: accounts[5], to: contractAddress, value: buyingValue }));
    });
});