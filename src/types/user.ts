export type PersonalDetails = {
  first_name: string;
  surname: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  residential_address: string;
  city: string;
  state: string;
  lga: string;
  bvn: string;
  nin: string;
  photo: string;
  step: number;
  gender: string;
  birthdate: string;
  photo_id: string;
  completed: boolean;
};

export type EducationType = {
  highest_education: string;
  learning_institution: string;
  graduation_year: string;
};

export type ExperienceType = {
  id?: number;
  company: string;
  company_location: string;
  achievements: string;
  experience_from: string;
  experience_to: string;
  currentlyWorksHere: boolean;
};

export type TrainingFielsType = {
  image_url?: string;
  training_url?: string;
  training_institution: string;
  training_name: string;
  training_from: string;
  training_to: string;
};

export type ProfessionalDetails = {
  nin: string;
  subsector: string;
  association: string;
  category: string;
  categoryId?: string;
  categoryName?: string;
  specialization: string;
  specializationId: string;
  years_of_experience: number;
  highest_education: string;
  learning_institution: string;
  graduation_year: string;
  operating_address: string;
  license_photo: string;
  licenceImage: string;
  step: number;
  photo: string;
  completed: boolean;
  qualifications: EducationType[];
};

export type BusinessDetails = {
  nin: string;
  company_name: string;
  business_city: string;
  business_state: string;
  business_lga: string;
  business_address: string;
  business_description?: string;
  business_logo: string;
  completed: boolean;
  verification: string;
};

export type PortfolioAndRate = {
  rate_price: string | number;
  rate_unit: string;
  rate_negotiable: boolean;
  achievements: string;
  company: string;
  addtional_rate_info: string;
  location: string;
  date_available_from: string;
  date_available_to: string;
  date_available_immediately: boolean;
  highest_education: string;
  learning_institution: string;
  graduation_year: string;
  nin: string;
  experiences: ExperienceType[];
};

export type CompleteProfile = PersonalDetails &
  ProfessionalDetails &
  BusinessDetails &
  PortfolioAndRate & {
    id: number;
    bio: string;
    status: string;
    created_at: string;
    business_name: string;
    availability: string;
    moreDetails: string;
    skill?: string;
    skills: string[];
    trainings: TrainingFielsType[];
    experiences: ExperienceType[];
    experience_from: string;
    experience_to: string;
    currentlyWorksHere: boolean;
    rate: number;
    long: string;
    lat: string;
  };

export type ProfileUpdateProps = {
  handleSubmit: (arg: Partial<CompleteProfile>) => void;
  updateLoading: boolean;
  data: CompleteProfile;
};

export type AuthUserType = {
  id: number;
  role: string;
  photo: string;
  photo_id: string;
  surname: string;
  first_name: string;
  last_name: string;
};

export type LoggedInUser = PersonalDetails & {
  active: boolean;
  role: string;
  artisan_id: number;
  access_token: string;
  license_status: string;
  refresh_token: string;
  license_date_renewal: string;
  license_expiry_date: string;
  renew_license: boolean;
};
