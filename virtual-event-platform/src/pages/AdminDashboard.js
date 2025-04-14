import React from "react";
import "./PagesStyles.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const eventData = [
  {
    id: "#1",
    name: "Ai/ML",
    organizer: "Matt Dickerson",
    date: "13/05/2022",
    fee: "$4.95",
    payment: "Online/Offline",
    status: "Delivered",
    icon: "🧠",
  },
  {
    id: "#2",
    name: "Python",
    organizer: "Trixie Byrd",
    date: "15/06/2022",
    fee: "$1,149.95",
    payment: "Online/Offline",
    status: "Process",
    icon: "🐍",
  },
  {
    id: "#3",
    name: "R",
    organizer: "Sanderson",
    date: "25/09/2022",
    fee: "$22.95",
    payment: "Online/Offline",
    status: "Canceled",
    icon: "📊",
  },
];

const statusColor = {
  Delivered: "delivered",
  Process: "process",
  Canceled: "canceled",
};

const AdminEventTable = () => {
  return (
    <div className="admin-table-container">
      <h2>Manage Events</h2>
      <table className="event-table">
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Event Name</th>
            <th>Organizer Name</th>
            <th>Date</th>
            <th>Fees</th>
            <th>Payment Mode</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event, index) => (
            <tr key={index}>
              <td>{event.id}</td>
              <td>
                <span className="event-icon">{event.icon}</span>
                {event.name}
              </td>
              <td>{event.organizer}</td>
              <td>{event.date}</td>
              <td>{event.fee}</td>
              <td>{event.payment}</td>
              <td>
                <span className={`status-badge ${statusColor[event.status]}`}>
                  {event.status}
                </span>
              </td>
              <td>
                <FaEdit className="action-icon edit" />
                <FaTrash className="action-icon delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <span className="page active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>
      </div>
    </div>
  );
};

export default AdminEventTable;
