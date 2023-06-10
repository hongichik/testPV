import Swal from 'sweetalert2';

const AlertSuccess = (title = "Thông báo", text = "", time = 2000) => {
  Swal.fire({
    title: title,
    text: text,
    timer: time,
    icon: "success",
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  })
}


const AlertError = (title = "Thông báo", text = "Lỗi", time = 2000) => {
  Swal.fire({
    title: title,
    text: text,
    timer: time,
    icon: "error",
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  })
}

const SweetAlert = {
  AlertSuccess,
  AlertError,
}

export default SweetAlert;