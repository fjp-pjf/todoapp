import { useState } from "react";

const App = () => {
  const initialPeople = [
    {
      firstName: "Femin",
      lastName: "Justin",
    },
    {
      firstName: "Vimal",
      lastName: "Murali",
    },
  ];

  const [people, setPeople] = useState(initialPeople);
  const [editingIdx, setEditingIdx] = useState(null);

  const handleChange = (index, name, value) => {
    const updated = [...people];
    updated[index] = { ...people[index], [name]: value };
    setPeople(updated);
  };

  const handleEditEntry = (index) => {
    setEditingIdx(index);
  };

  const handleUpdateEntry = () => {
    setEditingIdx(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr>
              {editingIdx === index ? (
                <>
                  <input
                    value={person.firstName}
                    name="firstName"
                    onChange={(e) =>
                      handleChange(index, "firstName", e.target.value)
                    }
                  />
                  <input
                    value={person.lastName}
                    name="lastName"
                    onChange={(e) =>
                      handleChange(index, "lastName", e.target.value)
                    }
                  />
                  <button onClick={handleUpdateEntry}>Update</button>
                </>
              ) : (
                <>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>
                    <button onClick={() => handleEditEntry(index)}>edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
