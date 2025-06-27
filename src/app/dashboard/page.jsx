const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="bg-gray-800 border border-gray-700 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-4xl font-bold text-center mb-4 text-cyan-400">Dashboard</h2>
        <p className="text-center text-gray-300 text-lg">
          Welcome to your <span className="font-semibold text-white underline underline-offset-4">protected</span> dashboard!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
