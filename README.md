# 🚀 Dev Universal - Portfolio Professionnel

Un portfolio moderne, responsive et optimisé SEO développé avec **Next.js 14**, **React**, **Tailwind CSS** et **Framer Motion**.

### 🎨 Design & UX
- **Design moderne** avec animations fluides
- **Responsive** sur tous les appareils
- **Mode sombre/clair** automatique
- **Animations** avec Framer Motion
- **Interface intuitive** et professionnelle

### 🌍 Internationalisation
- **Support multilingue** (Français/Anglais)
- **URLs localisées** pour le SEO
- **Contenu adapté** par langue

### 📱 Pages Principales
- **Accueil** - Présentation et hero section
- **À propos** - Compétences, expérience, parcours
- **Portfolio** - Projets avec filtres et détails
- **Services** - Offres et tarification
- **Blog** - Articles techniques avec commentaires
- **Contact** - Formulaire avancé

### 🔧 Technique
- **Next.js 14** avec App Router
- **TypeScript** pour la robustesse
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **SEO optimisé** avec métadonnées
- **Performance** optimisée
- **Accessibilité** respectée


## 📁 Structure du Projet

```
dev-universal/
├───app
│   ├───admin
│   │   ├───articles
│   │   │   └───[id]
│   │   ├───dashboard
│   │   └───login
│   ├───api
│   │   ├───admin
│   │   │   ├───data
│   │   │   ├───messages
│   │   │   │   └───[id]
│   │   │   │       └───read
│   │   │   ├───projects
│   │   │   │   └───[id]
│   │   │   ├───stats
│   │   │   └───testimonials
│   │   │       └───[id]
│   │   ├───auth
│   │   │   ├───login
│   │   │   ├───logout
│   │   │   └───me
│   │   ├───blog
│   │   ├───chatbot
│   │   ├───generate-pdf
│   │   ├───messages
│   │   ├───projects
│   │   ├───quote
│   │   ├───search
│   │   ├───send-quote-email
│   │   ├───services
│   │   ├───settings
│   │   └───testimonials
│   └───[lang]
│       ├───about-3d
│       ├───blog
│       │   └───[id]
│       ├───contact
│       ├───devis
│       ├───estimated-project
│       ├───privacy-policy
│       ├───projects
│       │   └───[id]
│       ├───services
│       ├───terms-of-service
│       ├───testimonials
│       ├───faq
│       ├───avatar-demo
│       ├───avatar
│       └───packs
├───components
│   ├───models
│   └───scenes
├───context
├───i18n
├───lib
│   └───middleware
├───public
│   ├───icons
│   ├───images
│   │   ├───blog
│   │   ├───testimonials
│   │   └───projects
│   ├───screenshots
│   ├───uploads
│   └───videos
└───styles

## 🎨 Personnalisation

### Couleurs et Thème
Modifiez le fichier `tailwind.config.js` pour personnaliser les couleurs :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Vos couleurs personnalisées
      }
    }
  }
}
```


### Traductions
Modifiez les fichiers dans `app/lib/dictionaries/` :
- `fr.json` - Français
- `en.json` - Anglais

## 📊 SEO et Performance

### SEO
- Métadonnées dynamiques
- URLs optimisées
- Schema.org markup
- Sitemap automatique
- Robots.txt configuré

### Performance
- Images optimisées avec Next.js Image
- Code splitting automatique
- Lazy loading
- Compression gzip
- Cache optimisé

### Scores Lighthouse
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🚀 Déploiement

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation locale
```bash
# Cloner le repository
git clone https://github.com/votre-username/dev-universal.git
cd dev-universal

# Installer les dépendances
npm install

# Configuration de la base de données
npm run db:setup

# Lancer en développement
npm run dev
```

### Variables d'environnement
Créez un fichier `.env.local` :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dev_universal
DB_PORT=3306

# JWT
JWT_SECRET=votre-secret-jwt
JWT_EXPIRES_IN=7d

# Site
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-app-password
```

### Déploiement production

#### Vercel (Recommandé)
1. Poussez le code sur GitHub
2. Connectez à [vercel.com](https://vercel.com)
3. Importez le repository
4. Configurez les variables d'environnement
5. Déployez !

#### Autres plateformes
- **Netlify** : Build command `npm run build`, Publish directory `.next`
- **Railway** : Support complet Node.js + MySQL
- **Heroku** : Configuration avancée

### Base de données production
- **PlanetScale** (gratuit, serverless)
- **Railway** (facile)
- **AWS RDS** (avancé)

## 🆘 Support

Pour toute question ou problème :

1. **Issues GitHub** - Problèmes techniques
2. **Discussions** - Questions générales
3. **Email** - contact@dev-universal.com

---

**Développé avec ❤️ par Dev Universal**
