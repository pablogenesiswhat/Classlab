const OAuth = require("../../modules/auth");
const Sheets = require("../../modules/spreadsheets");
const Classroom = require("../../modules/classroom");
const { info, error } = require("../../modules/logger");

const oauth = new OAuth();

oauth.exec()
  .then(auth => {
    const classroom = new Classroom(auth);
    const sheets = new Sheets(auth);

    sheets.getSheet(rows => {
      if (rows.err) return error(rows.err.errors);
      else {
        const args = rows.res;

        if (args.courses.length == 0)
          return error("No class names to supply. (Required minimum 1)");
        else if (args.teachers.length == 0)
          return error("No teachers to supply the classes. (Required minimum 1)");
        else if (args.students.length == 0)
          return error("No students to supply the classes. (Required minimum 1)");

        classroom.createClass(args, (coursesCreatedID) => {
          let countCurses = 0;

          const save = () => {
            const course = coursesCreatedID[countCurses] || null;

            if (course) {
              const optionsTCH = {
                courseId: course,
                teachers: args.teachers
              };

              classroom.createTeacher(optionsTCH, (tchResult) => {
                const optionsSTD = {
                  courseId: course,
                  students: args.students
                };

                classroom.createStudent(optionsSTD, (stdResult) => {
                  countCurses ++;
                  save();
                });
              });
            } else  info("Provisioning completed");
          }; save();
        });
      }
    });
  })
  .catch(e => {
    error(e);
  });
