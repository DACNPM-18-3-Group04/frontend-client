import { toast } from 'react-toastify';

export const handleSignUpSuccess = () => {
  toast.success(
    'Tạo tài khoản thành công. Kiểm tra email để kích hoạt tài khoản',
  );
};
