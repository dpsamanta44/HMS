import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]); // ✅ NEW
  const [complaints, setComplaints] = useState([]);
  const [visitors, setVisitors] = useState([]);

  return (
    <DataContext.Provider
      value={{
        rooms,
        setRooms,
        students,
        setStudents,
        staff,
        setStaff, // ✅ NEW
        visitors,
        setVisitors,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
