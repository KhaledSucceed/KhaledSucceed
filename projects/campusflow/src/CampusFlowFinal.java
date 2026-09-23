import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.*;
import java.util.List;

public class CampusFlowFinal {
    record Department(String name) {}
    record Course(String code, String name, int students) {}
    record Student(int id, String name, double gpa, String department) {}

    static final class DataSet {
        final List<Department> departments;
        final List<Course> courses;
        final List<Student> students;

        DataSet(List<Department> departments, List<Course> courses, List<Student> students) {
            this.departments = departments;
            this.courses = courses;
            this.students = students;
        }
    }

    static DataSet generateDemoData() {
        List<Department> departments = new ArrayList<>();
        for (int i = 1; i <= 15; i++) {
            departments.add(new Department(String.format("Department %02d", 16 - i)));
        }

        List<Course> courses = new ArrayList<>();
        for (int i = 1; i <= 71; i++) {
            int enrolled = 25 + ((i * 37) % 480);
            courses.add(new Course(String.format("CSE%03d", i), "Course " + i, enrolled));
        }

        List<Student> students = new ArrayList<>();
        for (int i = 0; i < 16000; i++) {
            int id = 224100000 + ((i * 7919) % 16000);
            double gpa = 1.0 + (((i * 137) % 300) / 100.0);
            gpa = Math.min(gpa, 4.0);
            String dept = "Department " + String.format("%02d", (i % 15) + 1);
            students.add(new Student(id, "Student " + (i + 1), gpa, dept));
        }
        return new DataSet(departments, courses, students);
    }

    static void selectionSortDepartments(List<Department> items) {
        for (int i = 0; i < items.size() - 1; i++) {
            int min = i;
            for (int j = i + 1; j < items.size(); j++) {
                if (items.get(j).name().compareToIgnoreCase(items.get(min).name()) < 0) {
                    min = j;
                }
            }
            if (min != i) Collections.swap(items, i, min);
        }
    }

    static void insertionSortStudentsByGpa(List<Student> items) {
        for (int i = 1; i < items.size(); i++) {
            Student key = items.get(i);
            int j = i - 1;
            while (j >= 0 && items.get(j).gpa() > key.gpa()) {
                items.set(j + 1, items.get(j));
                j--;
            }
            items.set(j + 1, key);
        }
    }

    static void mergeSortCoursesByStudents(List<Course> items) {
        if (items.size() < 2) return;
        List<Course> buffer = new ArrayList<>(Collections.nCopies(items.size(), null));
        mergeSortCoursesByStudents(items, buffer, 0, items.size() - 1);
    }

    private static void mergeSortCoursesByStudents(
            List<Course> items, List<Course> buffer, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSortCoursesByStudents(items, buffer, left, mid);
        mergeSortCoursesByStudents(items, buffer, mid + 1, right);

        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            if (items.get(i).students() <= items.get(j).students()) {
                buffer.set(k++, items.get(i++));
            } else {
                buffer.set(k++, items.get(j++));
            }
        }
        while (i <= mid) buffer.set(k++, items.get(i++));
        while (j <= right) buffer.set(k++, items.get(j++));
        for (int x = left; x <= right; x++) items.set(x, buffer.get(x));
    }

    static Department binarySearchDepartment(List<Department> sorted, String target) {
        int low = 0, high = sorted.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int cmp = sorted.get(mid).name().compareToIgnoreCase(target);
            if (cmp == 0) return sorted.get(mid);
            if (cmp < 0) low = mid + 1;
            else high = mid - 1;
        }
        return null;
    }

    static Student binarySearchStudentById(List<Student> sortedById, int id) {
        int low = 0, high = sortedById.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int value = sortedById.get(mid).id();
            if (value == id) return sortedById.get(mid);
            if (value < id) low = mid + 1;
            else high = mid - 1;
        }
        return null;
    }

    static boolean isDepartmentsSorted(List<Department> list) {
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i - 1).name().compareToIgnoreCase(list.get(i).name()) > 0) return false;
        }
        return true;
    }

    static boolean isCoursesSorted(List<Course> list) {
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i - 1).students() > list.get(i).students()) return false;
        }
        return true;
    }

    static boolean isStudentsSortedByGpa(List<Student> list) {
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i - 1).gpa() > list.get(i).gpa()) return false;
        }
        return true;
    }

    static int runSelfTest() {
        DataSet data = generateDemoData();
        List<String> checks = new ArrayList<>();

        List<Department> departments = new ArrayList<>(data.departments);
        selectionSortDepartments(departments);
        checks.add("Selection Sort departments: " + (isDepartmentsSorted(departments) ? "PASS" : "FAIL"));

        List<Course> courses = new ArrayList<>(data.courses);
        mergeSortCoursesByStudents(courses);
        checks.add("Merge Sort courses: " + (isCoursesSorted(courses) ? "PASS" : "FAIL"));

        List<Student> studentsByGpa = new ArrayList<>(data.students);
        insertionSortStudentsByGpa(studentsByGpa);
        checks.add("Insertion Sort students: " + (isStudentsSortedByGpa(studentsByGpa) ? "PASS" : "FAIL"));

        Department targetDepartment = departments.get(7);
        checks.add("Binary Search department: " +
                (binarySearchDepartment(departments, targetDepartment.name()) != null ? "PASS" : "FAIL"));

        List<Student> studentsById = new ArrayList<>(data.students);
        studentsById.sort(Comparator.comparingInt(Student::id));
        Student targetStudent = studentsById.get(8000);
        checks.add("Binary Search student ID: " +
                (binarySearchStudentById(studentsById, targetStudent.id()) != null ? "PASS" : "FAIL"));

        checks.add("Scale 15/71/16000: " +
                (data.departments.size() == 15 && data.courses.size() == 71 && data.students.size() == 16000
                        ? "PASS" : "FAIL"));

        boolean overall = true;
        for (String check : checks) {
            System.out.println(check);
            overall &= check.endsWith("PASS");
        }
        System.out.println("Overall: " + (overall ? "PASS" : "FAIL"));
        return overall ? 0 : 1;
    }

    private final DataSet data = generateDemoData();
    private final DefaultTableModel model = new DefaultTableModel();

    private JPanel buildHeader() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBorder(new EmptyBorder(16, 18, 16, 18));

        JLabel title = new JLabel("CampusFlow — Algorithm Visual Lab");
        title.setFont(title.getFont().deriveFont(Font.BOLD, 24f));
        panel.add(title, BorderLayout.WEST);

        JLabel counts = new JLabel("15 Departments   •   71 Courses   •   16,000 Students");
        counts.setForeground(new Color(70, 80, 95));
        panel.add(counts, BorderLayout.EAST);
        return panel;
    }

    private JPanel buildControls(JTable table) {
        JPanel controls = new JPanel(new FlowLayout(FlowLayout.LEFT, 10, 10));

        JButton deptSort = new JButton("Selection Sort Departments");
        deptSort.addActionListener(e -> {
            List<Department> copy = new ArrayList<>(data.departments);
            selectionSortDepartments(copy);
            showDepartments(copy);
        });

        JButton courseSort = new JButton("Merge Sort Courses");
        courseSort.addActionListener(e -> {
            List<Course> copy = new ArrayList<>(data.courses);
            mergeSortCoursesByStudents(copy);
            showCourses(copy);
        });

        JButton studentSort = new JButton("Insertion Sort Students");
        studentSort.addActionListener(e -> {
            List<Student> copy = new ArrayList<>(data.students.subList(0, 250));
            insertionSortStudentsByGpa(copy);
            showStudents(copy);
        });

        JTextField departmentSearch = new JTextField(14);
        JButton searchDept = new JButton("Find Department");
        searchDept.addActionListener(e -> {
            List<Department> copy = new ArrayList<>(data.departments);
            selectionSortDepartments(copy);
            Department found = binarySearchDepartment(copy, departmentSearch.getText().trim());
            JOptionPane.showMessageDialog(table,
                    found == null ? "Department not found" : "Found: " + found.name(),
                    "Department Binary Search — O(log n)",
                    found == null ? JOptionPane.WARNING_MESSAGE : JOptionPane.INFORMATION_MESSAGE);
        });

        JTextField studentSearch = new JTextField(10);
        JButton searchStudent = new JButton("Find Student ID");
        searchStudent.addActionListener(e -> {
            try {
                int id = Integer.parseInt(studentSearch.getText().trim());
                List<Student> copy = new ArrayList<>(data.students);
                copy.sort(Comparator.comparingInt(Student::id));
                Student found = binarySearchStudentById(copy, id);
                String message = found == null
                        ? "Student not found"
                        : "Found: " + found.id() + " · " + found.name() + " · GPA "
                        + String.format("%.2f", found.gpa());
                JOptionPane.showMessageDialog(table,
                        message,
                        "Student-ID Binary Search — O(log n)",
                        found == null ? JOptionPane.WARNING_MESSAGE : JOptionPane.INFORMATION_MESSAGE);
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(table,
                        "Enter a numeric student ID.",
                        "Invalid input",
                        JOptionPane.WARNING_MESSAGE);
            }
        });

        controls.add(deptSort);
        controls.add(courseSort);
        controls.add(studentSort);
        controls.add(new JLabel("Department:"));
        controls.add(departmentSearch);
        controls.add(searchDept);
        controls.add(new JLabel("Student ID:"));
        controls.add(studentSearch);
        controls.add(searchStudent);
        return controls;
    }

    private void showDepartments(List<Department> list) {
        model.setDataVector(new Object[0][0], new Object[]{"Department"});
        for (Department d : list) model.addRow(new Object[]{d.name()});
    }

    private void showCourses(List<Course> list) {
        model.setDataVector(new Object[0][0], new Object[]{"Code", "Course", "Students"});
        for (Course c : list) model.addRow(new Object[]{c.code(), c.name(), c.students()});
    }

    private void showStudents(List<Student> list) {
        model.setDataVector(new Object[0][0], new Object[]{"Student ID", "Name", "GPA", "Department"});
        for (Student s : list) {
            model.addRow(new Object[]{s.id(), s.name(), String.format("%.2f", s.gpa()), s.department()});
        }
    }

    private void showGui() {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("CampusFlow — CSE112");
            frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
            frame.setMinimumSize(new Dimension(1120, 720));

            JTable table = new JTable(model);
            table.setFillsViewportHeight(true);
            table.setRowHeight(26);
            showDepartments(new ArrayList<>(data.departments));

            JPanel root = new JPanel(new BorderLayout());
            root.add(buildHeader(), BorderLayout.NORTH);
            root.add(new JScrollPane(table), BorderLayout.CENTER);

            JPanel south = new JPanel(new BorderLayout());
            south.add(buildControls(table), BorderLayout.NORTH);

            JTextArea complexity = new JTextArea(
                    "Complexity guide\n" +
                    "Selection Sort: O(n²) time, O(1) extra space\n" +
                    "Insertion Sort: O(n²) worst case, O(1) extra space\n" +
                    "Merge Sort: O(n log n) time, O(n) extra space\n" +
                    "Binary Search: O(log n) on sorted data");
            complexity.setEditable(false);
            complexity.setBorder(new EmptyBorder(8, 12, 12, 12));
            south.add(complexity, BorderLayout.SOUTH);

            root.add(south, BorderLayout.SOUTH);
            frame.setContentPane(root);
            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }

    public static void main(String[] args) {
        if (args.length > 0 && "--selftest".equals(args[0])) {
            System.exit(runSelfTest());
        }
        new CampusFlowFinal().showGui();
    }
}