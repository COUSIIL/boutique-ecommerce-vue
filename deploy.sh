#!/bin/bash

REMOTE_USER="nqcyrzkh"
REMOTE_HOST="57.128.97.32"
REMOTE_LINK="$REMOTE_USER@$REMOTE_HOST"
REMOTE_PORT="5804"
REMOTE_PATH="/home/nqcyrzkh/public_html"

# Variables
DIST_DIR="/home/cousiil/Bureau/Vue projects/boutique_pierty/dist"  # Remplace ce chemin par le chemin absolu vers ton répertoire dist
HTACCESS_FILE="/home/cousiil/Bureau/Vue projects/boutique_pierty/.htaccess" # Remplace ce chemin par le chemin absolu de ton fichier .htaccess
SERVER_DIR=$REMOTE_PATH  # Répertoire sur ton serveur où tu veux déployer (ex : /home/user/public_html)

# Étape 1 : Construire l'application Vue.js pour la production
echo "🔨 Construction de l'application Vue.js pour la production..."
npm run build

# Vérifier si la construction a réussi
if [ $? -ne 0 ]; then
  echo "❌ La construction a échoué. Veuillez vérifier les erreurs."
  exit 1
fi

ssh -p $REMOTE_PORT $REMOTE_LINK "mkdir -p $REMOTE_PATH"


# Étape 2 : Copier les fichiers générés dans le répertoire du serveur
echo "🚀 Déploiement des fichiers sur le serveur..."
scp -r -P $REMOTE_PORT "$DIST_DIR"/* "$REMOTE_LINK:$SERVER_DIR"

# Étape 3 : Copier le fichier .htaccess dans le répertoire du serveur
echo "📄 Copie du fichier .htaccess..."
scp -P $REMOTE_PORT "$HTACCESS_FILE" "$REMOTE_LINK:$SERVER_DIR"

# Étape 4 : Vérification des permissions
echo "🔒 Vérification des permissions du fichier .htaccess..."
ssh -p $REMOTE_PORT $REMOTE_LINK "chmod 644 $SERVER_DIR/.htaccess"

# Étape 5 : Message de confirmation
echo "✅ Déploiement terminé avec succès !"
