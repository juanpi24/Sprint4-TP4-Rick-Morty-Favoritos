export const statusTranslations = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};

export const speciesTranslations = {
  Human: "Humano",
  Alien: "Alienígena",
  Humanoid: "Humanoide",
  Robot: "Robot",
  Animal: "Animal",
  Cronenberg: "Cronenberg",
  Disease: "Enfermedad",
  Mythological: "Mitológico",
  Poopybutthole: "Poopybutthole",
  Vampire: "Vampiro",
  unknown: "Desconocida",
};

export const genderTranslations = {
  Male: "Masculino",
  Female: "Femenino",
  Genderless: "Sin género",
  unknown: "Desconocido",
};

export const translateStatus = (status) => {
  return statusTranslations[status] || status || "Desconocido";
};

export const translateSpecies = (species) => {
  return speciesTranslations[species] || species || "Desconocida";
};

export const translateGender = (gender) => {
  return genderTranslations[gender] || gender || "Desconocido";
};