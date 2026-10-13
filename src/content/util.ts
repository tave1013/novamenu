/** I contenuti italiani usano lo slug anche come identificativo interno. */
export const withId = <T extends { id: string; slug: string }>(items: Omit<T, "id">[]): T[] => items.map((x) => ({ ...x, id: x.slug }) as T);
