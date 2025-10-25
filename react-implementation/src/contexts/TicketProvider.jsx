import React, { useState, useEffect } from "react";
import * as api from "../lib/api";
import { TicketContext } from "./context";

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Load tickets when component mounts
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTickets();
      setTickets(data);
    } catch (err) {
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (payload) => {
    setLoading(true);
    try {
      const newTicket = await api.createTicket(payload);
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id, payload) => {
    setLoading(true);
    try {
      const updated = await api.updateTicket(id, payload);
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (id) => {
    setLoading(true);
    try {
      await api.deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        loadTickets,
        createTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
