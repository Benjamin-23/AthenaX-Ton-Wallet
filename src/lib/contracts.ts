export const TICKET_NFT_CODE = `
pragma ton-solidity >= 0.57.0;

import "@tonclient/lib-std/contracts/token/nft/NftBase.sol";

contract TicketNFT is NftBase {
    struct TicketData {
        string eventId;
        string ticketType;
        uint256 price;
        bool used;
        uint256 purchaseTime;
        uint256 transferCount;
        address originalOwner;
    }

    TicketData ticketData;
    uint256 maxTransfers;
    uint256 minimumHoldTime;
    uint256 maxResellPrice;

    constructor(
        address owner,
        string eventId,
        string ticketType,
        uint256 price,
        uint256 _maxTransfers,
        uint256 _minimumHoldTime,
        uint256 _maxResellPrice
    ) public {
        tvm.accept();
        _mint(owner);

        ticketData.eventId = eventId;
        ticketData.ticketType = ticketType;
        ticketData.price = price;
        ticketData.used = false;
        ticketData.purchaseTime = now;
        ticketData.transferCount = 0;
        ticketData.originalOwner = owner;

        maxTransfers = _maxTransfers;
        minimumHoldTime = _minimumHoldTime;
        maxResellPrice = _maxResellPrice;
    }

    // Anti-scalping: Check if transfer is allowed
    function beforeTransfer(address newOwner, uint256 amount) internal override returns (bool) {
        require(ticketData.transferCount < maxTransfers, "Maximum transfers reached");
        require(now - ticketData.purchaseTime >= minimumHoldTime, "Minimum hold time not met");
        require(amount <= ticketData.price * maxResellPrice / 100, "Price exceeds maximum resell limit");

        ticketData.transferCount += 1;
        return true;
    }

    // Mark ticket as used
    function useTicket() public onlyOwner {
        require(!ticketData.used, "Ticket already used");
        ticketData.used = true;
    }

    // Get ticket data
    function getTicketData() public view returns (TicketData) {
        return ticketData;
    }
}
`;

interface TonClient {}

interface AntiScalpingParams {
  maxTransfers?: number;
  minimumHoldTime?: number;
  maxResellPrice?: number;
}

interface MintResult {
  address: string;
  ticketData: {
    eventId: string;
    ticketType: string;
    price: number;
    owner: string;
  };
}

interface TransferResult {
  success: boolean;
  newOwner: string;
}

interface VerifyResult {
  valid: boolean;
  ticketData: {
    eventId: string;
    ticketType: string;
    price: number;
  };
}

// Deploy a new ticket
export const mintTicket = async (
  _client: TonClient | null,
  eventId: string,
  ticketType: string,
  price: number,
  owner: string,
  antiScalpingParams?: AntiScalpingParams,
): Promise<MintResult> => {
  const params = antiScalpingParams || {
    maxTransfers: 2,
    minimumHoldTime: 86400, // 24 hours
    maxResellPrice: 150, // 150% of original price
  };

  // Deploy contract code and parameters...
  // This is simplified - actual deployment would need ABI and more parameters

  return {
    address: "NFT_CONTRACT_ADDRESS_WOULD_BE_RETURNED_HERE",
    ticketData: {
      eventId,
      ticketType,
      price,
      owner,
    },
  };
};

// Transfer ticket to new owner
export const transferTicket = async (
  _client: TonClient | null,
  _ticketAddress: string,
  newOwner: string,
  _price: number,
): Promise<TransferResult> => {
  // Actual implementation would call the contract's transfer method
  // This is simplified

  return {
    success: true,
    newOwner,
  };
};

// Verify ticket at event
export const verifyTicket = async (
  _client: TonClient | null,
  _ticketAddress: string,
): Promise<VerifyResult> => {
  // This would call the useTicket function on the contract
  // And verify the ticket hasn't been used before

  return {
    valid: true,
    ticketData: {
      // Ticket data would be returned here
      eventId: "",
      ticketType: "",
      price: 0,
    },
  };
};
