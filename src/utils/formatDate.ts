import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (fecha: Date | string): string => {
  const dateObj = typeof fecha === "string" ? new Date(fecha) : fecha;
  return format(dateObj, "dd/MM/yyyy", { locale: es });
};
