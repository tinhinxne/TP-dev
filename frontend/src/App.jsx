import { useState, useEffect } from 'react'
import './App.css'

const DIFFICULTES = {
  facile: { label: 'Facile', xp: 10 },
  moyen: { label: 'Moyen', xp: 25 },
  difficile: { label: 'Difficile', xp: 50 },
}

const XP_PAR_NIVEAU = 100

function chargerTaches() {
  try {
    const sauvegarde = localStorage.getItem('odysse-taches')
    return sauvegarde ? JSON.parse(sauvegarde) : []
  } catch {
    return []
  }
}

function App() {
  const [taches, setTaches] = useState(chargerTaches)
  const [texte, setTexte] = useState('')
  const [difficulte, setDifficulte] = useState('facile')

  useEffect(() => {
    try {
      localStorage.setItem('odysse-taches', JSON.stringify(taches))
    } catch {
      // stockage indisponible : on ignore
    }
  }, [taches])

  const xpTotal = taches
    .filter((t) => t.terminee)
    .reduce((somme, t) => somme + DIFFICULTES[t.difficulte].xp, 0)
  const niveau = Math.floor(xpTotal / XP_PAR_NIVEAU) + 1
  const xpDansNiveau = xpTotal % XP_PAR_NIVEAU
  const terminees = taches.filter((t) => t.terminee).length

  function ajouterTache(e) {
    e.preventDefault()
    const nom = texte.trim()
    if (!nom) return
    setTaches([...taches, { id: Date.now(), nom, difficulte, terminee: false }])
    setTexte('')
  }

  function basculerTache(id) {
    setTaches(taches.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t)))
  }

  function supprimerTache(id) {
    setTaches(taches.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
          <h1 className="titre">🔐 Odysse - Connexion et quêtes</h1>

      <div className="carte">
        <div className="profil-haut">
          <span className="niveau">Niveau {niveau}</span>
          <span className="xp-texte">
            {xpDansNiveau} / {XP_PAR_NIVEAU} XP
          </span>
        </div>
        <div className="barre">
          <div className="barre-remplie" style={{ width: `${xpDansNiveau}%` }} />
        </div>
        <div className="stats">
          <div>
            <strong>{xpTotal}</strong>
            <span>XP total</span>
          </div>
          <div>
            <strong>{terminees}</strong>
            <span>Tâches terminées</span>
          </div>
          <div>
            <strong>{taches.length - terminees}</strong>
            <span>En cours</span>
          </div>
        </div>
      </div>

      <div className="carte">
        <form className="formulaire" onSubmit={ajouterTache}>
          <input
            type="text"
            placeholder="Nouvelle quête..."
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
          />
          <select value={difficulte} onChange={(e) => setDifficulte(e.target.value)}>
            {Object.entries(DIFFICULTES).map(([cle, d]) => (
              <option key={cle} value={cle}>
                {d.label} (+{d.xp} XP)
              </option>
            ))}
          </select>
          <button type="submit" className="btn-ajouter">
            Ajouter la quête
          </button>
        </form>
      </div>

      <div className="carte">
        {taches.length === 0 ? (
          <p className="vide">Aucune quête pour le moment. Ajoute-en une !</p>
        ) : (
          <ul className="liste">
            {taches.map((t) => (
              <li key={t.id} className={`tache ${t.terminee ? 'terminee' : ''}`}>
                <input
                  type="checkbox"
                  checked={t.terminee}
                  onChange={() => basculerTache(t.id)}
                />
                <span className="tache-texte">{t.nom}</span>
                <span className={`badge ${t.difficulte}`}>+{DIFFICULTES[t.difficulte].xp} XP</span>
                <button className="btn-suppr" onClick={() => supprimerTache(t.id)} title="Supprimer">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App