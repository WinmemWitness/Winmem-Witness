export type GenericParsed = { program: "generic"; programId: string; rawDataBase64?: string };
export function parseGeneric(programId: string, dataBase64?: string): GenericParsed {
  return { program: "generic", programId, rawDataBase64: dataBase64 };
}
