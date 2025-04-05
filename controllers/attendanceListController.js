const AttendanceList = require('../models/AttendanceList');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const AttendanceRecord = require('../models/AttendanceRecord');

const attendanceListController = {
    async createAttendanceList(req, res) {
        try {
            //Check userId exists
            const userId = req.user?.id;
            if (!userId) return res.status(403).json({ message: 'Unauthorized access' });

            //Check teacherId exists
            const teacher = new Teacher();
            const teacherByUserId = await teacher.getTeacherByUserId(userId);
            if (!teacherByUserId) return res.status(403).json({ message: 'Unauthorized access' });

            const attendanceRecord = new AttendanceRecord();

            const teacherId = teacherByUserId.id;
            const { title } = req.body;
            if (!title) return res.status(400).json({ message: 'Title is required' });
            const attendanceList = new AttendanceList();
            const status = 'active';
            const createdAt = new Date();
    
            const newAttendanceList = await attendanceList.createAttendanceList(title, teacherId, status, createdAt);
            const student = new Student();
            const students = await student.getAllStudent();
            for (const student of students) {
                const status = 'pending';
                await attendanceRecord.createAttendanceRecord(newAttendanceList.id, student.id, status);
                console.log(`Created attendance record for student ${student.id}`);
            }
            res.status(200).json(newAttendanceList);

            //Expire after 2 hours
            setTimeout(async() =>{
                try{
                    const attendanceRecords = await attendanceRecord.getAttendanceRecordsByAttendanceListId(newAttendanceList.id);
                    for (const record of attendanceRecords) {
                        if(record.status === 'pending'){
                            await attendanceRecord.updateAttended(record.id, 'absent');
                        }
                    }
                    await attendanceList.updateAttendanceList(newAttendanceList.id, newAttendanceList.title, 'closed');
                    console.log(`Attendance list ${newAttendanceList.id} closed and pending records marked absent`);
                } catch (err) {
                    console.error('Error closing attendance list and marking pending records absent', err);
                }
            }, 60*60*1000)
        } catch (e) {;
            res.status(500).json({ message: 'Error creating attendance list', error: e.message });
        }
    },
    async getAttendanceListsByTeacherId(req, res){
        try {
            const {teacherId } = req.params;
            if (!teacherId) return res.status(404).json({message: 'Teacher not found'});
            const attendanceList = new AttendanceList();
            const attendanceLists = await attendanceList.getAttendanceListsByTeacherId(teacherId);
            res.status(200).json(attendanceLists);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attendance lists', error });
        }
    },
    async getAttendanceListById(req, res){
        try {
            const { id } = req.params;
            const attendanceList = new AttendanceList();
            const existingAttendanceList = await attendanceList.getAttendanceListById(id);
            if (!existingAttendanceList) return res.status(404).json({message: 'Attendance list not found'});
            res.status(200).json(existingAttendanceList);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attendance list', error });
        }
    },
    async getAttendanceLists(req, res){
        try {
            const attendanceList = new AttendanceList();
            const attendanceLists = await attendanceList.getAttendanceLists();
            res.status(200).json(attendanceLists);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attendance lists', error });
        }
    },
    async updateAttendanceList(req, res){
        try {
            const { id } = req.params;
            const { title, status } = req.body;
            const attendanceList = new AttendanceList();
            const existingAttendanceList = await attendanceList.getAttendanceListById(id);
            if (!existingAttendanceList) return res.status(404).json({message: 'Attendance list not found'});
            if(existingAttendanceList.status === 'closed') return res.status(400).json({message: 'Attendance list is closed, cannot update'});
            const updatedAttendanceList = await attendanceList.updateAttendanceList(id, title, status);
            res.status(200).json(updatedAttendanceList);
        } catch (error) {
            res.status(500).json({ message: 'Error updating attendance list', error });
        }
    },
    async deleteAttendanceList(req, res){
        try {
            const { id } = req.params;
            const attendanceList = new AttendanceList();
            const existingAttendanceList = await attendanceList.getAttendanceListById(id);
            if (!existingAttendanceList) return res.status(404).json({message: 'Attendance list not found'});
            const deletedAttendanceList = await attendanceList.deleteAttendanceList(id);
            res.status(200).json(deletedAttendanceList);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting attendance list', error });
        }
    },
    async searchAttendanceList(req, res){
        try {
            const { query } = req.query;
            const attendanceList = new AttendanceList();
            const attendanceLists = await attendanceList.searchAttendanceList(query);
            res.status(200).json(attendanceLists);
        } catch (error) {
            res.status(500).json({ message: 'Error searching attendance lists', error });
        }
    },
    async sortAttendanceLists(req, res){
        try {
            const { column, order } = req.query;
            const attendanceList = new AttendanceList();
            const sortedLists = await attendanceList.sortAttendanceList(column, order);
            res.json(sortedLists);
        } catch (error) {
            res.status(500).json({ message: 'Error sorting attendance lists', error });
        }
    }
}

module.exports = attendanceListController;