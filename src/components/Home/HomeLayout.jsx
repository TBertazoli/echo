export default function HomeLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 bg-gray-200">Sidebar</div>
      <div className="col-span-8 bg-gray-100">Main Content</div>
    </div>
  );
}
