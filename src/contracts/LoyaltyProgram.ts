// smart-contracts/LoyaltyProgram.ts - To be compiled to FunC/Fift
import { Cell, Contract, contractAddress, beginCell, Address } from "ton";

export default class LoyaltyProgram implements Contract {
  // Business address => user address => points mapping
  private pointsMap: Map<string, Map<string, number>>;

  constructor() {
    this.pointsMap = new Map();
  }

  // Award points to a user for a purchase
  async awardPoints(
    businessAddress: Address,
    userAddress: Address,
    amount: number,
  ) {
    const businessKey = businessAddress.toString();
    const userKey = userAddress.toString();

    if (!this.pointsMap.has(businessKey)) {
      this.pointsMap.set(businessKey, new Map());
    }

    const userPoints = this.pointsMap.get(businessKey);
    const currentPoints = userPoints.get(userKey) || 0;
    userPoints.set(userKey, currentPoints + amount);

    return true;
  }

  // Get user points for a specific business
  async getPoints(
    businessAddress: Address,
    userAddress: Address,
  ): Promise<number> {
    const businessKey = businessAddress.toString();
    const userKey = userAddress.toString();

    if (!this.pointsMap.has(businessKey)) {
      return 0;
    }

    return this.pointsMap.get(businessKey).get(userKey) || 0;
  }

  // Redeem points (called by business)
  async redeemPoints(
    businessAddress: Address,
    userAddress: Address,
    points: number,
  ): Promise<boolean> {
    const businessKey = businessAddress.toString();
    const userKey = userAddress.toString();

    if (!this.pointsMap.has(businessKey)) {
      return false;
    }

    const userPoints = this.pointsMap.get(businessKey);
    const currentPoints = userPoints.get(userKey) || 0;

    if (currentPoints < points) {
      return false;
    }

    userPoints.set(userKey, currentPoints - points);
    return true;
  }
}
