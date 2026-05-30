-- CreateTable
CREATE TABLE "Configuracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "siteTitle" TEXT NOT NULL DEFAULT 'Doce Amor | Confeitaria Artesanal',
    "heroTitle" TEXT NOT NULL DEFAULT 'Arte em forma de Açúcar',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Descubra os sabores mais incríveis e os temas mais encantadores para tornar o seu momento inesquecível. Tudo feito com muito amor e ingredientes selecionados.',
    "phone" TEXT NOT NULL DEFAULT '(66) 99624-5858',
    "whatsapp" TEXT NOT NULL DEFAULT '5566996245858',
    "instagram" TEXT,
    "facebook" TEXT,
    "alertBannerActive" BOOLEAN NOT NULL DEFAULT false,
    "alertBannerText" TEXT
);

-- CreateTable
CREATE TABLE "Recheio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "precoKg" REAL NOT NULL,
    "tags" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GaleriaItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imagem" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OpcaoFormulario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoria" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
