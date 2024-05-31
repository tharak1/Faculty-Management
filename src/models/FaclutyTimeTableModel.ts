interface Period {
    StartTime: string;
    EndTime: string;
    ClassType: string;
    Section: string;
    Department: string;
    Year: string;
    Regulation: string;
    SubjectName: string;
    SubjectCode: string;
  }
  
  interface DaySchedule {
    Day: string;
    Periods: Period[];
  }
  
  interface FacultyTimeTable {
    FacultyId: string;
    FacultyName: string;
    FacultyDepartment: string;
    TimeTable: DaySchedule[];
    created_at: Date;
    updated_at: Date;
  }
  
  export type { Period, DaySchedule, FacultyTimeTable };
  