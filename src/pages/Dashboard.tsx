import StorageTest from '../components/testing/StorageTest';
function Dashboard() {
    return (
        <div>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
                <p className="text-gray-600">
                    Quick overview of your Marvel Champions stats and recent games.
                </p>
            </div>

            <StorageTest />
        </div>
    );
}

export default Dashboard;