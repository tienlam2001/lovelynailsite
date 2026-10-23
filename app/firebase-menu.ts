import { listCollection, menuSectionsFromDocuments, type MenuSection } from "./firebase-public";

export async function getFirebaseMenu(fallback: MenuSection[]): Promise<MenuSection[]> {
  const signal = AbortSignal.timeout(4000);
  const [lovely, shared] = await Promise.all([
    listCollection("lovelyNailServices", signal),
    listCollection("services", signal),
  ]);
  if (!lovely.ok && !shared.ok) return fallback;
  const sections = menuSectionsFromDocuments([
    ...(lovely.ok ? lovely.documents : []),
    ...(shared.ok ? shared.documents : []),
  ]);
  if (!sections.length && !lovely.ok) return fallback;
  return sections;
}
