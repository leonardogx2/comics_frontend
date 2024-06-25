export function convertToBRL(value: number) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export const calculateOfferPercentage = (total: number, slice?: number) => {
  if (!slice) return 0;

  const offerPercentage = 100 - (slice * 100) / total;
  return "-" + Math.floor(offerPercentage) + "%";
};

export const classNames = "h-[480px] w-[330px] h-[300px] w-[200px]";

export const categorySelectOptions = [
  { label: "Ação", value: "ACTION" },
  { label: "Aventura", value: "ADVENTURE" },
  { label: "Comédia", value: "COMEDY" },
  { label: "Drama", value: "DRAMA" },
  { label: "Fantasia", value: "FANTASY" },
  { label: "Ficção", value: "FICTION" },
  { label: "Romance", value: "ROMANTIC" },
  { label: "Super-herói", value: "SUPERHERO" },
  { label: "Suspense", value: "SUSPENSE" },
  { label: "Terror", value: "HORROR" },
];

export const validateParamValue = (value: string | null) => {
  if (value === "undefined" || value === null) return undefined;
  return value;
};

export function isValidCardNumber(cardNumber: string): boolean {
  cardNumber = cardNumber.replace(/\s+/g, "");
  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function isFutureDate(date: Date | string) {
  return new Date().getTime() < new Date(date).getTime();
}

export function isValidCVV(cvv: string): boolean {
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(cvv);
}

export function isValidCPF(cpf: string) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false;
  }
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return false;
  return true;
}
