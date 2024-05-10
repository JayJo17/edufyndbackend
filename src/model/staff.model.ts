import * as mongoose from 'mongoose'


export interface StaffDocument extends mongoose.Document {
    employeeID?: string;
    photo?: string;
    name?: string;
    designation?: string;
    jobDescription?: string;
    reportingManager?: string;
    shiftTiming?: string; // (Attendance to be calculated based on this)
    areTheyEligibleForCasualLeave?: boolean; // – Yes/No (Yes – Casual to be considered | No – Casual leave restricted)
    doj?: String; // (Date of Joining)
    dob?: String;    // (Date of Birth)
    address?: string;
    email?: string;
    mobileNumber?: string;
    emergencyContactNo?: string;
    probationDuration?: string;
    salary?: string    // (Break Up with deduction – Manual)
    privileges?: string;   //(To be assigned by Super Admin) 
    idCard?: boolean;    // – Yes / No (If ‘Yes’ card to be generated)
    manageApplications?: string;   // Yes/No
    //If Yes, List Country & University The user can only handle applications of these universities and country
    activeInactive?: boolean    // – User
    teamLead?: string;     // – Select Employees and permission to be viewed.
}