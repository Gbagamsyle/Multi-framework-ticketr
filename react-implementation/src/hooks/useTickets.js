import { useContext } from "react";
import { TicketContext } from '../contexts/context';

export const useTickets = () => useContext(TicketContext);
