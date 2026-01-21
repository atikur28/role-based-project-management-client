export default function Footer() {
  return (
    <footer className="bg-gray-200 text-black py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RBAC Project Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
