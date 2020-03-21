const OAuth = require("../../modules/auth");
const Sheets = require("../../modules/spreadsheets");
const Classroom = require("../../modules/classroom");

const oauth = new OAuth();

oauth.exec()
  .then(auth => {
    const classroom = new Classroom(auth);
    const sheets = new Sheets(auth);

    sheets.getSheet(rows => {
      if (rows.err) return console.error(rows.err.errors);
      else {
        const args = rows.res;

        if (args.courses.length == 0)
          return console.error("No class names to supply. (Required minimum 1)");
        else if (args.teachers.length == 0)
          return console.error("No teachers to supply the classes. (Required minimum 1)");
        else if (args.students.length == 0)
          return console.error("No students to supply the classes. (Required minimum 1)");

        classroom.createClass(args, (coursesCreatedID) => {
          let countCurses = 0;
          const teachersResult = [];
          const studentsResult = [];

          const save = () => {
            const course = coursesCreatedID[countCurses] || null;

            if (course) {
              const optionsTCH = {
                courseId: course,
                teachers: args.teachers
              };

              classroom.createTeacher(optionsTCH, (tchResult) => {
                tchResult.push(tchResult);

                const optionsSTD = {
                  courseId: course,
                  students: args.students
                };

                classroom.createStudent(optionsSTD, (stdResult) => {
                  studentsResult.push(stdResult);
                  countCurses ++;
                  save();
                });
              });
            } else  console.log("Provisioning completed");
          }; save();
        });
      }
    });
  })
  .catch(e => {
    console.error(e);
  });
