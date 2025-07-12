import Swal from "sweetalert2";

// union type -> "success" | "error" | "warning" bunlardan biri verilmezse error verir
export const Toast = (title: string, icon: "success" | "error" | "warning") => {
  Swal.mixin({
    toast: true,
    icon: icon,
    title: title,
    position: "top-end",
    showConfirmButton: false,
    timer: 1400,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  }).fire();
};
