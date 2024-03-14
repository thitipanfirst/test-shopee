import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/modal/Modal";

export function Layouts({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <div className="grid">
        <div className="flex">
          <Navbar />
        </div>
        <div className=""> {children}</div>
      </div>
      <Modal />
    </div>
  );
}
