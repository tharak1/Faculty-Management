interface Faculty {
    _id?: string;
    FacultyId: string;
    FacultyName: string;
    FacultyDesignation: string;
    FacultyPhnNo: string;
    FacultyEmail: string;
    FacultyDepartment: string;
    FacultyDOB: string;
    FacultyAddress: string;
    Classes: {
        Department: string;
        Section: string;
        Regulation: string;
        Year: string;
    }[];
    AcceptedSubstitueInfo: {
        Date: string;
        Day: string;
        StartTime: string;
        EndTime: string;
        Department: string;
        Section: string;
        Regulation: string;
        Year: string;
        OriginalLecturer: string;
        Subject:string,
        ContactNo:string,
        SentOn:string
    }[];
    InQueueSubstituteInfo: {
        Date: string;
        Day: string;
        StartTime: string;
        EndTime: string;
        Department: string; 
        Section: string;
        Regulation: string;
        Year: string;
        OriginalLecturer: string;
        Subject:string,
        ContactNo:string,
        SentOn:string
    }[];
    IsAdmin: boolean;
    UserName: string;
    Password: string;
    TodaysAttendance:number;
}

export default Faculty;
