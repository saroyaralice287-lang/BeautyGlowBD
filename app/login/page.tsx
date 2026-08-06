export default function LoginPage() {
  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-center">Login</h1>

      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
        />

        <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700">
          Login
        </button>
      </form>
    </div>
  );
}