import React, { useEffect, useState } from 'react';


const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState('');

    useEffect(() => {
        fetch('https://attendance-system-server.vercel.app/attendance', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setAttendanceData(data))
    }, [])


    return (
        <div className='px-10'>
            <h3 className="text-2xl mb-5 font-bold font-Inter text-center bg-[#1678CB] text-white">Attendance information</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='active'>
                            <th>Date</th>
                            <th>Employee Name</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendanceData?.length &&
                            attendanceData?.map(attend =>
                                <tr key={attend.id}>
                                    <td>{attend.Date}</td>
                                    <td>{attend.Employee_Name}</td>
                                    <td>{attend.Status}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;