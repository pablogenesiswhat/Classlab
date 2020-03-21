const { google } = require('googleapis');
const { CLASSROOM_VERSION } = require("./config");

module.exports = class {
  constructor(auth) {
    this.classroom = google.classroom({
      version: CLASSROOM_VERSION,
      auth
    });
  }

  createTeacher(args, callback) {
    const classroom = this.classroom;
    const teachers = [];
    let count = 1;

    const setTeacher = () => {
      const teacher = args.teachers[count] || null;

      if (teacher) {
        const options = {
          courseId: args.courseId,
          requestBody: {
            userId: teacher
          }
        };

        classroom.courses.teachers.create(options, (err, res) => {
          if (err) {
            return console.error(err, teachers);
          } else {
            count ++;
            teachers.push(teacher);
            setTeacher();
          }
        });
      } else callback(teachers);
    }; setTeacher();
  }

  createStudent(args, callback) {
    const classroom = this.classroom;
    const students = [];
    let count = 0;

    const setStudent = () => {
      const student = args.students[count] || null;

      if (student) {
        const options = {
          courseId: args.courseId,
          requestBody: {
            userId: student
          }
        };

        classroom.courses.students.create(options, (err, res) => {
          if (err) {
            return console.error(err, students);
          } else {
            count ++;
            students.push(student);
            setStudent();
          }
        });
      } else callback(students);
    }; setStudent();
  }

  createClass(args, callback) {
    const classroom = this.classroom;
    const courses = [];
    let count = 0;

    const coursesCreate = () => {
      const course = args.courses[count] || null;

      if (course) {
        const options = {
          requestBody: {
            courseState: "ACTIVE",
            name: course,
            ownerId: args.teachers[0]
          }
        };

        classroom.courses.create(options, (err, res) => {
          if (err) {
            return console.error(err, courses);
          } else {
            count ++;
            courses.push(res.data.id);
            console.log(`Class created: name ${res.data.name}`);
            coursesCreate();
          }
        });
      } else callback(courses);
    }; coursesCreate();
  }
};
