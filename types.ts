
export enum UserRole {
  STUDENT = 'Student',
  PARENT = 'Parent',
  TUTOR = 'Tutor',
  INSTITUTE = 'Institute'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email: string;
}

export interface Tutor {
  id: string;
  name: string;
  subject: string[];
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  experience: string;
  verified: boolean;
  avatar: string;
}

export interface ClassSession {
  id: string;
  title: string;
  tutorName: string;
  time: string;
  type: 'live' | 'recorded';
  subject: string;
  thumbnail: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}
