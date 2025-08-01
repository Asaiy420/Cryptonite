const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  let lock;
  let unlockTime;
  let lockedAmount;
  let owner;
  let otherAccount;

  beforeEach(async function () {
    lockedAmount = ONE_GWEI;
    const currentBlock = await ethers.provider.getBlock("latest");
    unlockTime = currentBlock.timestamp + ONE_YEAR_IN_SECS;

    [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    await lock.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      expect(await ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const latestBlock = await ethers.provider.getBlock("latest");
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestBlock.timestamp, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    it("Should revert if called too soon", async function () {
      await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });

    it("Should revert if called from another account", async function () {
      // Increase time manually via evm_increaseTime
      await ethers.provider.send("evm_increaseTime", [ONE_YEAR_IN_SECS + 1]);
      await ethers.provider.send("evm_mine");

      await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
        "You aren't the owner"
      );
    });

    it("Should allow withdrawal after unlock time by owner", async function () {
      await ethers.provider.send("evm_increaseTime", [ONE_YEAR_IN_SECS + 1]);
      await ethers.provider.send("evm_mine");

      await expect(lock.withdraw()).not.to.be.reverted;
    });
  });
});
