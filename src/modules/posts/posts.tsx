import ProtectedRoute from "@/components/ProtectedRoute";

export default function Posts() {
  return (
    <ProtectedRoute>
      <div>This is posts page</div>
    </ProtectedRoute>
  );
}
