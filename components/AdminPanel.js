import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/getUsers');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Resources</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Water</th>
              <th>Food</th>
              <th>Wood</th>
              <th>Stone</th>
              <th>Knowledge</th>
              <th>Population</th>
              <th>Coal</th>
              <th>Gold</th>
              <th>Military</th>
            </tr>
          </thead>
          <tbody>
            {data.resources.map((resource) => (
              <tr key={resource.user_id}>
                <td>{resource.user_id}</td>
                <td>{resource.water}</td>
                <td>{resource.food}</td>
                <td>{resource.wood}</td>
                <td>{resource.stone}</td>
                <td>{resource.knowledge}</td>
                <td>{resource.population}</td>
                <td>{resource.coal}</td>
                <td>{resource.gold}</td>
                <td>{resource.military}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Buildings</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Building ID</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {data.buildings.map((building) => (
              <tr key={`${building.user_id}-${building.building_id}`}>
                <td>{building.user_id}</td>
                <td>{building.building_id}</td>
                <td>{building.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Capacity Rates</h3>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Water</th>
              <th>Food</th>
              <th>Wood</th>
              <th>Stone</th>
              <th>Knowledge</th>
              <th>Population</th>
              <th>Coal</th>
              <th>Gold</th>
              <th>Military</th>
              <th>Max Military Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.capacityRates.map((capacityRate) => (
              <tr key={capacityRate.user_id}>
                <td>{capacityRate.user_id}</td>
                <td>{capacityRate.water}</td>
                <td>{capacityRate.food}</td>
                <td>{capacityRate.wood}</td>
                <td>{capacityRate.stone}</td>
                <td>{capacityRate.knowledge}</td>
                <td>{capacityRate.population}</td>
                <td>{capacityRate.coal}</td>
                <td>{capacityRate.gold}</td>
                <td>{capacityRate.military}</td>
                <td>{capacityRate.maxMilitaryCapacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
