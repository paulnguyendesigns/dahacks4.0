import React from "react";
import "./index.css";

/*
  Hardcoded seasonal celebrity matches.
  Each celebrity has a main image and a set of outfits.
*/

const SEASON_DATA = {
  "Bright Spring": {
    celebrities: [
      {
        name: "Taylor Swift",
        image: "https://via.placeholder.com/200x250?text=Taylor+Swift",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Peach", desc: "Peach top with bright coral accents." },
          { img: "https://via.placeholder.com/120?text=Sunshine", desc: "Sunshine yellow dress—classic Spring color." }
        ]
      }
    ]
  },
  "True Spring": {
    celebrities: [
      {
        name: "Jessica Alba",
        image: "https://via.placeholder.com/200x250?text=Jessica+Alba",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Coral", desc: "Coral blouse with golden accessories." },
          { img: "https://via.placeholder.com/120?text=Mint", desc: "Mint top complements warm undertones." }
        ]
      }
    ]
  },
  "Light Spring": {
    celebrities: [
      {
        name: "Gigi Hadid",
        image: "https://via.placeholder.com/200x250?text=Gigi+Hadid",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Peach+Blush", desc: "Peach blush top with soft details." },
          { img: "https://via.placeholder.com/120?text=Light+Yellow", desc: "Light yellow dress—airy and bright." }
        ]
      }
    ]
  },
  "Soft Summer": {
    celebrities: [
      {
        name: "Emma Watson",
        image: "https://via.placeholder.com/200x250?text=Emma+Watson",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Lavender", desc: "Soft lavender sweater that suits muted tones." },
          { img: "https://via.placeholder.com/120?text=Dusty+Blue", desc: "Dusty blue top with minimal accessories." }
        ]
      }
    ]
  },
  "True Summer": {
    celebrities: [
      {
        name: "Kate Winslet",
        image: "https://via.placeholder.com/200x250?text=Kate+Winslet",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Soft+Pink", desc: "Soft pink dress for cool undertones." },
          { img: "https://via.placeholder.com/120?text=Powder+Blue", desc: "Powder blue top adds gentle contrast." }
        ]
      }
    ]
  },
  "Light Summer": {
    celebrities: [
      {
        name: "Drew Barrymore",
        image: "https://via.placeholder.com/200x250?text=Drew+Barrymore",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Ice+Blue", desc: "Ice blue blouse to match delicate features." },
          { img: "https://via.placeholder.com/120?text=Soft+Lilac", desc: "Soft lilac sweater for light Summer tones." }
        ]
      }
    ]
  },
  "Deep Autumn": {
    celebrities: [
      {
        name: "Zendaya",
        image: "https://via.placeholder.com/200x250?text=Zendaya",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Rust", desc: "Rust dress with deep teal earrings." },
          { img: "https://via.placeholder.com/120?text=Olive", desc: "Olive green jacket with gold accessories." }
        ]
      },
      {
        name: "Priyanka Chopra",
        image: "https://via.placeholder.com/200x250?text=Priyanka",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Terracotta", desc: "Terracotta gown paired with gold jewelry." },
          { img: "https://via.placeholder.com/120?text=Teal", desc: "Teal blouse that brings out warm undertones." }
        ]
      }
    ]
  },
  "True Autumn": {
    celebrities: [
      {
        name: "Jennifer Lopez",
        image: "https://via.placeholder.com/200x250?text=Jennifer+Lopez",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Camel", desc: "Camel dress with gold accents." },
          { img: "https://via.placeholder.com/120?text=Terracotta", desc: "Terracotta blouse enhances warm tones." }
        ]
      }
    ]
  },
  "Soft Autumn": {
    celebrities: [
      {
        name: "Jessica Biel",
        image: "https://via.placeholder.com/200x250?text=Jessica+Biel",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Mustard", desc: "Mustard sweater with soft texture." },
          { img: "https://via.placeholder.com/120?text=Olive", desc: "Olive jacket for muted Autumn look." }
        ]
      }
    ]
  },
  "Bright Winter": {
    celebrities: [
      {
        name: "Anne Hathaway",
        image: "https://via.placeholder.com/200x250?text=Anne+Hathaway",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Cobalt", desc: "Cobalt blue dress for crisp contrast." },
          { img: "https://via.placeholder.com/120?text=Fuchsia", desc: "Fuchsia top pops against deep tones." }
        ]
      }
    ]
  },
  "True Winter": {
    celebrities: [
      {
        name: "Dua Lipa",
        image: "https://via.placeholder.com/200x250?text=Dua+Lipa",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Cobalt", desc: "Cobalt blue top that enhances her contrast." },
          { img: "https://via.placeholder.com/120?text=Black", desc: "Classic black fit with silver accents." }
        ]
      },
      {
        name: "Lucy Liu",
        image: "https://via.placeholder.com/200x250?text=Lucy+Liu",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Magenta", desc: "Bold magenta dress for a crisp Winter pop." }
        ]
      }
    ]
  },
  "Dark Winter": {
    celebrities: [
      {
        name: "Sandra Oh",
        image: "https://via.placeholder.com/200x250?text=Sandra+Oh",
        outfits: [
          { img: "https://via.placeholder.com/120?text=Black", desc: "Classic black outfit for high contrast." },
          { img: "https://via.placeholder.com/120?text=Ruby", desc: "Ruby red accent for bold Winter look." }
        ]
      }
    ]
  }
};

export default function CelebMatches({ characteristic, season }) {
  // Normalize season: find exact key from SEASON_DATA ignoring case
  const normalizedSeason = Object.keys(SEASON_DATA).find(
    (key) => key.toLowerCase() === season.toLowerCase().trim()
  );

  const data = normalizedSeason ? SEASON_DATA[normalizedSeason] : null;

  if (!data) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h2>No celebrity matches found for: {characteristic} {season}</h2>
      </div>
    );
  }

  return (
    <div className="celeb-container">
      <h2 style={{ color: "#e1637a", marginBottom: "2rem" }}>
        Celebrity Matches for {normalizedSeason}
      </h2>


      {data.celebrities.map((celeb) => (
        <div key={celeb.name} className="celeb-card">
          <img src={celeb.image} alt={celeb.name} className="celeb-photo" />
          <h3>{celeb.name}</h3>

          <div className="outfit-row">
            {celeb.outfits.map((o, index) => (
              <div key={index} className="outfit-card">
                <img src={o.img} alt="Outfit" className="outfit-image" />
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

            {data.celebrities.map((celeb) => (
        <div key={celeb.name} className="celeb-card">
          <img src={celeb.image} alt={celeb.name} className="celeb-photo" />
          <h3>{celeb.name}</h3>

          <div className="outfit-row">
            {celeb.outfits.map((o, index) => (
              <div key={index} className="outfit-card">
                <img src={o.img} alt="Outfit" className="outfit-image" />
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>


  );
}
