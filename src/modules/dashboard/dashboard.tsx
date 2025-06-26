import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>This is dashboard page</div>
    </ProtectedRoute>
  );
}
