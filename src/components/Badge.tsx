export function Badge({ color = "green", children }: { color?: string, children: React.ReactNode }) {

  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800"
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
}