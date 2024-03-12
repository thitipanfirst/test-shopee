import Navbar from "@/components/navbar/Navbar";

export function Layouts({ children }) {
  return (
    <div className="flex flex-col overflow-y-auto" style={{ background: "#000000" }}>
      <div className="grid h-screen">
        <div className="flex">
          <Navbar />
        </div>
        <div className=""> {children}</div>
      </div>
    </div>
  );
}
