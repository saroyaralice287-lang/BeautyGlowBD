export default function Categories() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          Skincare
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          Makeup
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          Hair Care
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          Perfume
        </div>
      </div>
    </section>
  );
}