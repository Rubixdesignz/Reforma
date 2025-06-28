# nexusArts Portfolio

Un sito portfolio moderno e minimalista per nexusArts, studio grafico specializzato in design per gaming.

## 🚀 Caratteristiche

- **Design Super Minimal**: Interfaccia pulita e professionale
- **Animazioni Professionali**: Loader animato e transizioni fluide
- **Carousel 3D**: Portfolio showcase con effetti tridimensionali
- **GDPR Compliant**: Nessun cookie esterno o tracking
- **Responsive**: Ottimizzato per tutti i dispositivi
- **Performance**: Caricamento veloce e ottimizzato

## 🎨 Palette Colori

- **Arancione Primario**: #FF4D00
- **Arancione Secondario**: #FF6B2B  
- **Rosso Scuro**: #1A0F0F
- **Nero**: #0A0A0A

## 📁 Struttura File

```
nexusArts-portfolio/
├── index.html          # Pagina principale
├── styles.css          # Stili CSS
├── script.js           # JavaScript interazioni
├── logo.png            # Logo nexusArts
├── portfolio1.jpg      # Immagine portfolio (da sostituire)
└── README.md           # Documentazione
```

## 🛠️ Installazione

1. **Scarica tutti i file** nella cartella del tuo server web
2. **Sostituisci le immagini placeholder** con le tue immagini:
   - `logo.png` - Il tuo logo
   - `portfolio1.jpg, portfolio2.jpg, etc.` - Le tue immagini portfolio
3. **Apri index.html** nel browser

## 📸 Come Aggiungere Immagini Portfolio

Per aggiungere nuove immagini al carousel 3D:

1. **Aggiungi le immagini** nella cartella root (es: `portfolio6.jpg`)
2. **Modifica il file `script.js`** alla riga ~95, nell'array `portfolioData`:

```javascript
const portfolioData = [
    {
        image: 'portfolio1.png',
        title: 'Il tuo progetto',
        description: 'Descrizione del progetto'
    },
    // Aggiungi qui i tuoi nuovi progetti
    {
        image: 'portfolio1.png',
        title: 'Nuovo Progetto',
        description: 'Descrizione del nuovo progetto'
    }
];
```

3. **Salva e ricarica** la pagina

## 🎯 Sezioni del Sito

- **Hero**: Presentazione principale con logo animato
- **Chi Siamo**: Informazioni su nexusArts e strumenti utilizzati
- **Portfolio**: Carousel 3D con progetti
- **Servizi**: FiveM, Minecraft e design personalizzato
- **Contatti**: Link a Telegram, Discord ed Email

## 📞 Contatti

- **Telegram**: @thegiallos
- **Discord**: albertomichiamo  
- **Email**: posta.alberto22@gmail.com

## 🔧 Strumenti di Design

- Photoshop
- Illustrator  
- InDesign
- Figma

## 📱 Responsive

Il sito è completamente responsive e ottimizzato per:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ⚡ Performance

- **No Google Fonts**: Font locali per evitare cookie
- **No Tracking**: GDPR compliant
- **Lazy Loading**: Caricamento ottimizzato immagini
- **CSS/JS Minificato**: Performance ottimizzate

## 🎨 Personalizzazione

Per personalizzare i colori, modifica le variabili CSS in `styles.css`:

```css
:root {
    --primary-orange: #FF4D00;
    --secondary-orange: #FF6B2B;
    --dark-red: #1A0F0F;
    --black: #0A0A0A;
}
```

---

**nexusArts** - Design professionale per il gaming 🎮
