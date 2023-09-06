import "./css/style.css";
import "./css/dataTables.bootstrap5.min.css";
import AdminLayout from "./Layout/AdminLayout";
// eslint-disable-next-line
export default function Admin({ children }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
