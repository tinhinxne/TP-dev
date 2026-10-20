# Résolution du conflit

- **Fichier concerné** : README.md (ligne 1)
- **Cause** : la branche `feature/titre-readme` et la branche `main` ont modifié la même ligne du fichier.
- **Détection** : la commande `git merge feature/titre-readme` a affiché `CONFLICT (content): Merge conflict in README.md`.
- **Résolution** : ouverture du fichier dans VS Code, choix de la version finale (Accept Both Changes), suppression des marqueurs `<<<<<<<`, `=======` et `>>>>>>>`.
- **Validation** : `git add README.md` puis commit de fusion `merge: résolution du conflit sur le titre du README`.