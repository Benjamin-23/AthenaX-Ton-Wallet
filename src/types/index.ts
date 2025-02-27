export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  image: string;
  lowestPrice: number;
  availableTickets: number;
  ticketTypes?: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
}

export interface Ticket {
  id: string;
  address: string;
  eventId: string;
  eventName: string;
  date: string;
  venue: string;
  ticketType: string;
  price: number;
  used: boolean;
  purchaseTime: number;
  transferCount: number;
  maxTransfers: number;
  maxResellPrice: number;
  owner: string;
  seat?: string;
}

export interface TicketData {
  eventId: string;
  ticketType: string;
  price: number;
  used?: boolean;
  purchaseTime?: number;
  transferCount?: number;
  originalOwner?: string;
  owner?: string;
}

export interface AntiScalpingParams {
  maxTransfers?: number;
  minimumHoldTime?: number;
  maxResellPrice?: number;
}

export interface TransferResult {
  success: boolean;
  newOwner: string;
}

export interface VerifyResult {
  valid: boolean;
  ticketData: TicketData;
}

export interface MintResult {
  address: string;
  ticketData: TicketData;
}
