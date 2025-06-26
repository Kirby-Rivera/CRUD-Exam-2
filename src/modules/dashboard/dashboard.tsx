import Layout from "@/components/layout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Layout>
        <div>This is dashboard page</div>
      </Layout>
    </ProtectedRoute>
  );
}
