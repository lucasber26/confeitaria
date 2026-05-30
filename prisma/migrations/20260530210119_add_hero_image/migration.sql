-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Configuracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "siteTitle" TEXT NOT NULL DEFAULT 'Doce Amor | Confeitaria Artesanal',
    "heroTitle" TEXT NOT NULL DEFAULT 'Arte em forma de Açúcar',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Descubra os sabores mais incríveis e os temas mais encantadores para tornar o seu momento inesquecível. Tudo feito com muito amor e ingredientes selecionados.',
    "heroImage" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
    "phone" TEXT NOT NULL DEFAULT '(66) 99624-5858',
    "whatsapp" TEXT NOT NULL DEFAULT '5566996245858',
    "instagram" TEXT,
    "facebook" TEXT,
    "alertBannerActive" BOOLEAN NOT NULL DEFAULT false,
    "alertBannerText" TEXT
);
INSERT INTO "new_Configuracao" ("alertBannerActive", "alertBannerText", "facebook", "heroSubtitle", "heroTitle", "id", "instagram", "phone", "siteTitle", "whatsapp") SELECT "alertBannerActive", "alertBannerText", "facebook", "heroSubtitle", "heroTitle", "id", "instagram", "phone", "siteTitle", "whatsapp" FROM "Configuracao";
DROP TABLE "Configuracao";
ALTER TABLE "new_Configuracao" RENAME TO "Configuracao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
