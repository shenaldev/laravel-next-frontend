export type UserResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: null | string;
    is_admin: boolean | 1 | 0;
    created_at: string | null;
    updated_at: string | null;
  };
  token: string;
};

export type EmailVerificationSuccess = {
  vaild: boolean;
  message: string;
};
