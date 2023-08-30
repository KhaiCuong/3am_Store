import "../css/style.css";
import "../css/dataTables.bootstrap5.min.css";

export default function ProductManager() {
  return (
    <main className="mt-5 pt-3">
      <div className="container pt-4">
        <h2>Table Head Colors</h2>
        <p>
          The .thead-dark class adds a black background to table headers, and the .thead-light class
          adds a grey background to table headers:
        </p>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
