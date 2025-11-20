# 🚀 SaaS Gestion Boutiques - Backend

## 📦 Installation

1. Cloner le projet
2. Installer les dépendances :

```bash
npm install
```

3. Créer le fichier `.env` :

```bash
cp .env.example .env
```

4. Configurer les variables d'environnement dans `.env`

5. Générer le client Prisma :

```bash
npm run prisma:generate
```

6. Créer la base de données et lancer les migrations :

```bash
npm run prisma:migrate
```

7. (Optionnel) Peupler la base avec des données de démonstration :

```bash
npm run prisma:seed
```

## 🏃 Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm run build
npm start
```

## 🔧 Commandes utiles

```bash
# Prisma Studio (interface graphique DB)
npm run prisma:studio

# Créer une nouvelle migration
npm run prisma:migrate

# Régénérer le client Prisma
npm run prisma:generate
```

## 📍 Endpoints API

Base URL: `http://localhost:5000/api/v1`

### Auth

- POST `/auth/register` - Inscription
- POST `/auth/login` - Connexion
- GET `/auth/me` - Utilisateur connecté

### Users

- GET `/users` - Liste des utilisateurs
- GET `/users/:id` - Détail utilisateur
- POST `/users` - Créer utilisateur
- PUT `/users/:id` - Modifier utilisateur
- DELETE `/users/:id` - Supprimer utilisateur

### Stores

- GET `/stores` - Boutique actuelle
- PUT `/stores` - Modifier boutique

### Categories

- GET `/categories` - Liste des catégories
- GET `/categories/:id` - Détail catégorie
- POST `/categories` - Créer catégorie
- PUT `/categories/:id` - Modifier catégorie
- DELETE `/categories/:id` - Supprimer catégorie

### Products

- GET `/products` - Liste des produits (filtres: search, categoryId, isActive, lowStock)
- GET `/products/low-stock` - Produits en stock faible
- GET `/products/:id` - Détail produit
- POST `/products` - Créer produit
- PUT `/products/:id` - Modifier produit
- DELETE `/products/:id` - Supprimer produit

### Sales

- GET `/sales` - Liste des ventes (filtres: startDate, endDate, paymentMethod)
- GET `/sales/stats` - Statistiques des ventes
- GET `/sales/:id` - Détail vente
- POST `/sales` - Créer vente
- DELETE `/sales/:id` - Annuler vente

### Expenses

- GET `/expenses` - Liste des dépenses (filtres: startDate, endDate, category)
- GET `/expenses/stats` - Statistiques des dépenses
- GET `/expenses/categories` - Catégories de dépenses
- GET `/expenses/:id` - Détail dépense
- POST `/expenses` - Créer dépense
- PUT `/expenses/:id` - Modifier dépense
- DELETE `/expenses/:id` - Supprimer dépense

### Stock

- GET `/stock/movements` - Mouvements de stock (filtres: productId, type, startDate, endDate)
- POST `/stock/movements` - Créer mouvement
- GET `/stock/value` - Valeur du stock
- GET `/stock/alerts` - Alertes de stock

### Dashboard

- GET `/dashboard/overview` - Vue d'ensemble (filtres: startDate, endDate)
- GET `/dashboard/sales-chart` - Graphique des ventes (query: days)
- GET `/dashboard/top-products` - Produits les plus vendus (query: limit)
- GET `/dashboard/activities` - Activités récentes (query: limit)

## 🔐 Authentification

Toutes les routes (sauf `/auth/register` et `/auth/login`) nécessitent un token JWT dans le header :

```
Authorization: Bearer <token>
```

## 👤 Rôles

- **ADMIN** : Accès complet
- **EMPLOYEE** : Accès limité (pas de gestion des utilisateurs, pas de modification de la boutique)

## 🗃️ Base de données

PostgreSQL avec Prisma ORM

### Structure principale :

- User (utilisateurs)
- Store (boutiques)
- Category (catégories)
- Product (produits)
- Sale (ventes)
- SaleItem (articles vendus)
- Expense (dépenses)
- StockMovement (mouvements de stock)
