
export interface Batch {
  id: string;
  name: string;
  course: string;
  timing: string;
  teacher: string;
  teacherId: string;
  status: 'Active' | 'Completed';
  maxStudents: number;
  currentStudents: number;
  startDate: string;
  endDate?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  contact: string;
  email: string;
  assignedBatches: string[];
  experience: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
}

export interface Student {
  id: string;
  name: string;
  aadhaar: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  guardian: string;
  guardianContact: string;
  course: string;
  batchId: string;
  admissionDate: string;
  address: string;
  contact: string;
  photo?: string;
  status: 'Active' | 'Completed' | 'Dropped';
  attendance: number;
  progress: number;
}

export const teachers: Teacher[] = [
  {
    id: 'T001',
    name: 'Raj Sir',
    subjects: ['Coding', 'Web Development'],
    contact: '9876543210',
    email: 'raj.sir@janhitsanstha.org',
    assignedBatches: ['B001', 'B002'],
    experience: '5 years',
    joiningDate: '2022-01-15',
    status: 'Active'
  },
  {
    id: 'T002',
    name: 'Achal Ma\'am',
    subjects: ['Web Development'],
    contact: '9876543211',
    email: 'achal.maam@janhitsanstha.org',
    assignedBatches: ['B003'],
    experience: '4 years',
    joiningDate: '2022-03-20',
    status: 'Active'
  },
  {
    id: 'T003',
    name: 'Chirangiv Sir',
    subjects: ['Tally'],
    contact: '9876543212',
    email: 'chirangiv.sir@janhitsanstha.org',
    assignedBatches: ['B003'],
    experience: '6 years',
    joiningDate: '2021-11-10',
    status: 'Active'
  }
];

export const batches: Batch[] = [
  {
    id: 'B001',
    name: 'Coding Batch',
    course: 'Programming & Coding',
    timing: '11:00 AM - 1:00 PM',
    teacher: 'Raj Sir',
    teacherId: 'T001',
    status: 'Active',
    maxStudents: 25,
    currentStudents: 18,
    startDate: '2024-01-15',
  },
  {
    id: 'B002',
    name: 'Web 1.2 Batch',
    course: 'Web Development Advanced',
    timing: '1:00 PM - 3:00 PM',
    teacher: 'Raj Sir',
    teacherId: 'T001',
    status: 'Active',
    maxStudents: 25,
    currentStudents: 22,
    startDate: '2024-02-01',
  },
  {
    id: 'B003',
    name: 'Web 1.1 + Tally Batch',
    course: 'Web Development Basic + Tally',
    timing: '4:00 PM - 6:00 PM',
    teacher: 'Achal Ma\'am & Chirangiv Sir',
    teacherId: 'T002',
    status: 'Active',
    maxStudents: 30,
    currentStudents: 25,
    startDate: '2024-01-20',
  }
];

export const sampleStudents: Student[] = [
  {
    id: 'S001',
    name: 'Priya Sharma',
    aadhaar: '1234-5678-9012',
    age: 22,
    gender: 'Female',
    guardian: 'Raj Sharma',
    guardianContact: '9876543210',
    course: 'Programming & Coding',
    batchId: 'B001',
    admissionDate: '2024-01-15',
    address: 'Village Khadkala, Dist. Ahmednagar, Maharashtra',
    contact: '9876543213',
    status: 'Active',
    attendance: 92,
    progress: 75
  },
  {
    id: 'S002',
    name: 'Rahul Patil',
    aadhaar: '1234-5678-9013',
    age: 24,
    gender: 'Male',
    guardian: 'Suresh Patil',
    guardianContact: '9876543211',
    course: 'Web Development Advanced',
    batchId: 'B002',
    admissionDate: '2024-02-01',
    address: 'Village Nimgaon, Dist. Pune, Maharashtra',
    contact: '9876543214',
    status: 'Active',
    attendance: 88,
    progress: 68
  },
  {
    id: 'S003',
    name: 'Sunita Jadhav',
    aadhaar: '1234-5678-9014',
    age: 26,
    gender: 'Female',
    guardian: 'Mohan Jadhav',
    guardianContact: '9876543212',
    course: 'Web Development Basic + Tally',
    batchId: 'B003',
    admissionDate: '2024-01-20',
    address: 'Village Sangamner, Dist. Ahmednagar, Maharashtra',
    contact: '9876543215',
    status: 'Active',
    attendance: 95,
    progress: 82
  },
  {
    id: 'S004',
    name: 'Amit Kumar',
    aadhaar: '1234-5678-9015',
    age: 23,
    gender: 'Male',
    guardian: 'Rajesh Kumar',
    guardianContact: '9876543216',
    course: 'Programming & Coding',
    batchId: 'B001',
    admissionDate: '2024-01-20',
    address: 'Village Shrirampur, Dist. Ahmednagar, Maharashtra',
    contact: '9876543217',
    status: 'Active',
    attendance: 87,
    progress: 72
  },
  {
    id: 'S005',
    name: 'Kavita Desai',
    aadhaar: '1234-5678-9016',
    age: 25,
    gender: 'Female',
    guardian: 'Vishnu Desai',
    guardianContact: '9876543218',
    course: 'Web Development Advanced',
    batchId: 'B002',
    admissionDate: '2024-02-05',
    address: 'Village Newasa, Dist. Ahmednagar, Maharashtra',
    contact: '9876543219',
    status: 'Active',
    attendance: 91,
    progress: 78
  },
  {
    id: 'S006',
    name: 'Sachin Bhosale',
    aadhaar: '1234-5678-9017',
    age: 21,
    gender: 'Male',
    guardian: 'Ganesh Bhosale',
    guardianContact: '9876543220',
    course: 'Web Development Basic + Tally',
    batchId: 'B003',
    admissionDate: '2024-01-25',
    address: 'Village Akole, Dist. Ahmednagar, Maharashtra',
    contact: '9876543221',
    status: 'Active',
    attendance: 89,
    progress: 85
  },
  {
    id: 'S007',
    name: 'Pooja Jadhav',
    aadhaar: '1234-5678-9018',
    age: 24,
    gender: 'Female',
    guardian: 'Prakash Jadhav',
    guardianContact: '9876543222',
    course: 'Programming & Coding',
    batchId: 'B001',
    admissionDate: '2024-01-18',
    address: 'Village Parner, Dist. Ahmednagar, Maharashtra',
    contact: '9876543223',
    status: 'Active',
    attendance: 94,
    progress: 80
  },
  {
    id: 'S008',
    name: 'Vikram Patil',
    aadhaar: '1234-5678-9019',
    age: 22,
    gender: 'Male',
    guardian: 'Shankar Patil',
    guardianContact: '9876543224',
    course: 'Web Development Advanced',
    batchId: 'B002',
    admissionDate: '2024-02-03',
    address: 'Village Rahata, Dist. Ahmednagar, Maharashtra',
    contact: '9876543225',
    status: 'Active',
    attendance: 86,
    progress: 71
  },
  {
    id: 'S009',
    name: 'Sneha Gaikwad',
    aadhaar: '1234-5678-9020',
    age: 23,
    gender: 'Female',
    guardian: 'Ramesh Gaikwad',
    guardianContact: '9876543226',
    course: 'Web Development Basic + Tally',
    batchId: 'B003',
    admissionDate: '2024-01-22',
    address: 'Village Kopargaon, Dist. Ahmednagar, Maharashtra',
    contact: '9876543227',
    status: 'Active',
    attendance: 93,
    progress: 88
  },
  {
    id: 'S010',
    name: 'Rohit Sawant',
    aadhaar: '1234-5678-9021',
    age: 26,
    gender: 'Male',
    guardian: 'Balaji Sawant',
    guardianContact: '9876543228',
    course: 'Programming & Coding',
    batchId: 'B001',
    admissionDate: '2024-01-25',
    address: 'Village Sangamner, Dist. Ahmednagar, Maharashtra',
    contact: '9876543229',
    status: 'Active',
    attendance: 90,
    progress: 76
  }
];
