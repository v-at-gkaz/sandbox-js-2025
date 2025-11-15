-- создаём таблицы

CREATE TABLE students (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(50) NOT NULL,
                          grade NUMERIC(3,1) NOT NULL
);

CREATE TABLE courses (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(50) NOT NULL
);

CREATE TABLE student_courses (
                                 student_id INT REFERENCES students(id),
                                 course_id INT REFERENCES courses(id),
                                 PRIMARY KEY(student_id, course_id)
);

-- Добавим тестовые данные
INSERT INTO students (name, grade) VALUES
                                       ('Alice', 85.5),
                                       ('Bob', 92.0),
                                       ('Charlie', 78.0),
                                       ('Diana', 88.5);

INSERT INTO courses (name) VALUES
                               ('Math'),
                               ('Physics'),
                               ('Chemistry');

INSERT INTO student_courses (student_id, course_id) VALUES
                                                        (1, 1),
                                                        (1, 2),
                                                        (2, 1),
                                                        (3, 2),
                                                        (4, 3);

-- Example 1

CREATE OR REPLACE FUNCTION avg_grade()
RETURNS NUMERIC AS $$
DECLARE
result NUMERIC;
BEGIN
SELECT AVG(grade) INTO result FROM students;
RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Check
SELECT avg_grade();


-- Example 2

CREATE OR REPLACE FUNCTION get_student_name(student_id INT)
RETURNS VARCHAR AS $$
DECLARE
result VARCHAR;
BEGIN
SELECT name INTO result FROM students WHERE id = student_id;
RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Check
SELECT get_student_name(2);


-- Example 3
CREATE OR REPLACE FUNCTION increase_grade(student_id INT, increment NUMERIC)
RETURNS VOID AS $$
BEGIN
UPDATE students
SET grade = grade + increment
WHERE id = student_id;
END;
$$ LANGUAGE plpgsql;

-- Check
SELECT * FROM students;
SELECT increase_grade(3, 5);
SELECT * FROM students;


-- Example 4
CREATE OR REPLACE FUNCTION passed(student_id INT)
RETURNS BOOLEAN AS $$
DECLARE
s_grade NUMERIC;
BEGIN
SELECT grade INTO s_grade FROM students WHERE id = student_id;
RETURN s_grade >= 60;
END;
$$ LANGUAGE plpgsql;

-- Check
SELECT passed(1); -- true
SELECT passed(3); -- true


-- Example 5
CREATE OR REPLACE FUNCTION students_with_courses()
RETURNS TABLE(student_name VARCHAR, course_name VARCHAR) AS $$
BEGIN
RETURN QUERY
SELECT s.name, c.name
FROM students s
         JOIN student_courses sc ON s.id = sc.student_id
         JOIN courses c ON c.id = sc.course_id;
END;
$$ LANGUAGE plpgsql;

-- Check
SELECT * FROM students_with_courses();


-- Example 6
CREATE OR REPLACE PROCEDURE add_student_to_course(
    student_name VARCHAR,
    student_grade NUMERIC,
    course_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
student_id INT;  -- переменная для нового студента
BEGIN
    -- Проверка существования курса
    IF NOT EXISTS (SELECT 1 FROM courses WHERE id = course_id) THEN
        RAISE EXCEPTION 'Курс с id=% не существует', course_id;
    END IF;

    -- Начало транзакции
    BEGIN
        INSERT INTO students(name, grade) VALUES (student_name, student_grade) RETURNING id INTO student_id;
        INSERT INTO student_courses(student_id, course_id) VALUES (student_id, course_id);
    END;
END;
$$;

-- Check
CALL add_student_to_course('Eva', 91.0, 99);
CALL add_student_to_course('Eva', 91.0, 2);
SELECT * FROM students;
SELECT * FROM student_courses;