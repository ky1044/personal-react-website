/**
 * "2023-05" -> "05/2023". The literal "present" passes through.
 *
 * Replaces the old duration parser: dates now arrive already structured from
 * resumeData, so this only has to reorder two fields.
 */
export const formatMonth = (value: string): string => {
  if (value === "present") return "present";
  const [year, month] = value.split("-");
  return month && year ? `${month}/${year}` : value;
};
