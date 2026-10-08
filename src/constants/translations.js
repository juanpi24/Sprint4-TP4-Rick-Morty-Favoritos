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

export const originTranslations = {
  "Earth (C-137)": "Tierra (C-137)",
  "Earth (Replacement Dimension)": "Tierra (Dimensión de reemplazo)",
  "Earth (Giant Telepathic Spiders Dimension)": "Tierra (Dimensión de las arañas telepáticas gigantes)",
  "Earth (Pizza Dimension)": "Tierra (Dimensión de la pizza)",
  "Earth (Phone Dimension)": "Tierra (Dimensión del teléfono)",
  "Earth (Chair Dimension)": "Tierra (Dimensión de las sillas)",
  "Earth (Fascist Dimension)": "Tierra (Dimensión fascista)",
  "Earth (Wasp Dimension)": "Tierra (Dimensión de las avispas)",
  "Earth (Fascist Shrimp Dimension)": "Tierra (Dimensión de los camarones fascistas)",
  "Earth (Tusk Dimension)": "Tierra (Dimensión de los colmillos)",
  "Earth (Fly Fishing Dimension)": "Tierra (Dimensión de la pesca con mosca)",
  "Earth (Wasp Rick's Dimension)": "Tierra (Dimensión de Rick Avispa)",
  "Earth (Fascist Teddy Bear Dimension)": "Tierra (Dimensión de los osos de peluche fascistas)",
  "Earth (Unknown Dimension)": "Tierra (Dimensión desconocida)",
  "Earth (Unknown)": "Tierra (Desconocida)",
  "Earth (Dimension 5-126)": "Tierra (Dimensión 5-126)",
  "Earth (Dimension 5-154)": "Tierra (Dimensión 5-154)",
  "Earth (Dimension 5-661)": "Tierra (Dimensión 5-661)",
  "Earth (Dimension 5-769)": "Tierra (Dimensión 5-769)",
  "Earth (Dimension 5-775)": "Tierra (Dimensión 5-775)",
  "Earth (Dimension 5-998)": "Tierra (Dimensión 5-998)",
  "Earth (Dimension C-500A)": "Tierra (Dimensión C-500A)",
  "Earth (Dimension D-99)": "Tierra (Dimensión D-99)",
  "Earth (Dimension J19ζ7)": "Tierra (Dimensión J19ζ7)",
  "Earth (Dimension K-22)": "Tierra (Dimensión K-22)",
  "Earth (Dimension K-83)": "Tierra (Dimensión K-83)",
  "Earth (Dimension C-137)": "Tierra (Dimensión C-137)",
  "Abadango": "Abadango",
  "Citadel of Ricks": "Ciudadela de los Ricks",
  "Anatomy Park": "Parque Anatómico",
  "Interdimensional Cable": "Cable Interdimensional",
  "Bird World": "Mundo de los Pájaros",
  "Purge Planet": "Planeta de la Purga",
  "Gazorpazorp": "Gazorpazorp",
  "Resort World": "Mundo Resort",
  "Mr. Goldenfold's Dimension": "Dimensión del Sr. Goldenfold",
  "unknown": "Desconocido",
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

export const translateOrigin = (origin) => {
  if (!origin) {
    return "Desconocido";
  }

  return originTranslations[origin] || origin;
};