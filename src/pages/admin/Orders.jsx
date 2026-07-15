import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";
import {
  Search,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/UI/ConfirmModal/ConfirmModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import styles from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders/enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteOrder(deleteId);
      setOrders((prev) => prev.filter((order) => order.id !== deleteId));
      toast.success("Order record deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order.");
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  // Metrics calculations
  const totalEnquiries = orders.length;
  const pendingEnquiries = orders.filter((o) => o.status === "Pending").length;
  const completedEnquiries = orders.filter((o) => o.status === "Completed").length;

  // Filter & Search Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !search ||
      order.productName?.toLowerCase().includes(search.toLowerCase()) ||
      order.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner text="Loading Enquiries & Click Logs..." />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageHeader}>
        <h1>Enquiries & Leads</h1>
        <p>Track all customer clicks, WhatsApp orders, and redirect logs.</p>
      </div>

      {/* ─── Metrics Section ─── */}
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.totalIcon}`}>
            <MessageSquare size={24} />
          </div>
          <div className={styles.metricInfo}>
            <h4>Total Enquiries</h4>
            <h2>{totalEnquiries}</h2>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.pendingIcon}`}>
            <Clock size={24} />
          </div>
          <div className={styles.metricInfo}>
            <h4>Pending Reviews</h4>
            <h2>{pendingEnquiries}</h2>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.completedIcon}`}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <h4>Completed/Closed</h4>
            <h2>{completedEnquiries}</h2>
          </div>
        </div>
      </div>

      {/* ─── Toolbar Section ─── */}
      <div className={styles.toolbar}>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)" }}>WhatsApp Click Logs</h3>
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by Product Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ─── Table Section ─── */}
      <div className={styles.tableWrapper}>
        {filteredOrders.length === 0 ? (
          <div className={styles.empty}>
            <h3>No Logs Found</h3>
            <p>Try adjusting your search query or filter settings.</p>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Enquiry ID</th>
                  <th>Product Details</th>
                  <th>Price</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className={styles.date}>#{order.id.slice(0, 8)}</span>
                    </td>
                    <td>
                      <div className={styles.productCell}>
                        <img
                          src={order.image || "/placeholder-product.png"}
                          alt={order.productName}
                        />
                        <span className={styles.productName}>
                          {order.productName}
                        </span>
                      </div>
                    </td>
                    <td>₹{order.price}</td>
                    <td>
                      <div className={styles.productCell}>
                        <Calendar size={14} className={styles.date} />
                        <span className={styles.date}>
                          {order.timestamp?.toLocaleDateString()} at{" "}
                          {order.timestamp?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          order.status === "Completed"
                            ? styles.statusCompleted
                            : order.status === "Cancelled"
                            ? styles.statusCancelled
                            : styles.statusPending
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {order.status !== "Completed" && (
                          <button
                            className={styles.actionBtn}
                            onClick={() =>
                              handleStatusChange(order.id, "Completed")
                            }
                            title="Mark as Completed"
                          >
                            <CheckCircle size={16} color="#16a34a" />
                          </button>
                        )}
                        {order.status !== "Cancelled" && (
                          <button
                            className={styles.actionBtn}
                            onClick={() =>
                              handleStatusChange(order.id, "Cancelled")
                            }
                            title="Mark as Cancelled"
                          >
                            <XCircle size={16} color="#dc2626" />
                          </button>
                        )}
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => {
                            setDeleteId(order.id);
                            setShowModal(true);
                          }}
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        open={showModal}
        title="Delete Order/Enquiry Record"
        message="Are you sure you want to delete this click log? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setShowModal(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default Orders;