import { toast } from 'react-toastify';

export const handleFailure = (err) => {
  let message = err.message; //Incase cannot request to server
  if (err.response && err.response.data) {
    message = err.response.data.message;
  }
  toast.error(message);
};
