import { Contract, Address } from "ton";

export class TicketNFT implements Contract {
  ticketId: string;
  eventId: string;
  owner: Address;
  ticketType: string;
  isUsed: boolean;
  purchasePrice: string;
  address: Address; // Added required Contract interface property
  transferHistory: {
    from: Address;
    to: Address;
    price: string;
    timestamp: number;
  }[];

  constructor(
    ticketId: string,
    eventId: string,
    owner: Address,
    ticketType: string,
    purchasePrice: string,
    address: Address,
  ) {
    this.ticketId = ticketId;
    this.eventId = eventId;
    this.owner = owner;
    this.ticketType = ticketType;
    this.isUsed = false;
    this.purchasePrice = purchasePrice;
    this.address = address;
    this.transferHistory = [];
  }

  transfer(newOwner: Address, price: string) {
    // Get event contract to check transfer restrictions
    // Verify transfer is allowed (price caps, time restrictions)
    // Calculate and send fee to organizer if applicable

    // Record transfer in history
    this.transferHistory.push({
      from: this.owner,
      to: newOwner,
      price,
      timestamp: Math.floor(Date.now() / 1000),
    });

    // Update owner
    this.owner = newOwner;
  }

  markAsUsed() {
    // Only event contract can call this
    this.isUsed = true;
  }
}
