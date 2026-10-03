export const brand = {
  name: "FECHITAT",
  fullName: "Federación Chilena de Taekwon-Do Tradicional",
  itfAffiliation: "International Taekwon-Do Federation",
  colors: {
    red: "#D21111",
    redHover: "#B50E0E",
    black: "#121212",
    paper: "#F8FAFC",
    line: "#E2E8F0",
    textSoft: "#64748B",
    white: "#FFFFFF",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
  },
} as const;

export type BrandTheme = typeof brand;
