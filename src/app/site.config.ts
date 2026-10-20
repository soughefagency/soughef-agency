/**
 * Configuration globale du site.
 * Modifiez ici le nom, l'e-mail, les réseaux sociaux et les logos :
 * toutes les sections du site sont synchronisées automatiquement.
 */
export const SITE_CONFIG = {
  /** Nom de marque affiché (header, footer, hero, titres). */
  brand: {
    name: 'SOUGHEF',
    subName: 'AGENCY',
    /** Utilisé pour le <title>, les sujets mailto, les aria-labels… */
    fullName: 'SOUGHEF AGENCY',
    /** Accroche courte (stamp À propos, mentions de marque). */
    tagline: 'Création web, marketing digital et identité de marque.',
  },

  /** Adresse e-mail de contact (formulaire + section contact). */
  email: 'contact@sougheforganization.com',

  /** Réseaux sociaux — mettez l'URL complète ou '' pour masquer l'icône. */
  socials: {
    facebook: 'https://www.facebook.com/sougheforganization',
    instagram: 'https://www.instagram.com/sougheforganization',
    tiktok: 'https://www.tiktok.com/@sougheforganization',
  },

  /** Fichiers dans public/. Remplacez les fichiers en conservant les noms. */
  logos: {
    /** Monogramme carré (header, footer). */
    mark: 'logos/monogramme.png',
    /** Logo horizontal complet. */
    complete: 'logos/logo-complet.png',
    /** Avatar réseaux sociaux. */
    avatar: 'logos/avatar.png',
    /** Icône d'onglet du navigateur. */
    favicon: 'favicon.png',
  },
} as const;
