import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAttendance = () => {
  const { attendanceId } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    attendanceId: '',
    studentId: '',
    date: '',
    status: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/attendance/${attendanceId}`);
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance record:', error.response ? error.response.data : error.message);
        setErrorMessage('Failed to load attendance record.');
      }
    };

    fetchAttendance();
  }, [attendanceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/attendance/${attendanceId}`, attendance);
      navigate(`/attendance/${attendance.studentId}`);
    } catch (error) {
      console.error('Error updating attendance:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to update attendance record.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Attendance Record</h2>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="attendanceId" className="block text-sm font-medium text-gray-700">Attendance ID</label>
          <input
            type="text"
            id="attendanceId"
            name="attendanceId"
            value={attendance.attendanceId}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={attendance.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Attendance
        </button>
      </form>
    </div>
  );
};

export default EditAttendance;
