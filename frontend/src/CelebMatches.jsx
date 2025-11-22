import React from "react";
import "./index.css";

/*
  Hardcoded seasonal celebrity matches.
  You can replace these placeholder images with real ones.
*/

const SEASON_DATA = {
  "Deep Autumn": {
    celebrities: [
      {
        name: "Zendaya",
        image: "https://via.placeholder.com/200x250?text=Zendaya",
        outfits: [
          {
            img: "https://via.placeholder.com/120?text=Rust",
            desc: "Rust dress with deep teal earrings."
          },
          {
            img: "https://via.placeholder.com/120?text=Olive",
            desc: "Olive green jacket with gold accessories."
          }
        ]
      },
      {
        name: "Priyanka Chopra",
        image: "https://via.placeholder.com/200x250?text=Priyanka",
        outfits: [
          {
            img: "https://via.placeholder.com/120?text=Terracotta",
            desc: "Terracotta gown paired with gold jewelry."
          },
          {
            img: "https://via.placeholder.com/120?text=Teal",
            desc: "Teal blouse that brings out warm undertones."
          }
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
          {
            img: "https://via.placeholder.com/120?text=Cobalt",
            desc: "Cobalt blue top that enhances her contrast."
          },
          {
            img: "https://via.placeholder.com/120?text=Black",
            desc: "Classic black fit with silver accents."
          }
        ]
      },
      {
        name: "Lucy Liu",
        image: "https://via.placeholder.com/200x250?text=Lucy+Liu",
        outfits: [
          {
            img: "https://via.placeholder.com/120?text=Magenta",
            desc: "Bold magenta dress for a crisp Winter pop."
          }
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
          {
            img: "https://via.placeholder.com/120?text=Lavender",
            desc: "Soft lavender sweater that suits muted tones."
          },
          {
            img: "https://via.placeholder.com/120?text=Dusty+Blue",
            desc: "Dusty blue top with minimal accessories."
          }
        ]
      }
    ]
  },

  "Bright Spring": {
    celebrities: [
      {
        name: "Taylor Swift",
        image: "https://via.placeholder.com/200x250?text=Taylor+Swift",
        outfits: [
          {
            img: "https://via.placeholder.com/120?text=Peach",
            desc: "Peach top with bright coral accents."
          },
          {
            img: "https://via.placeholder.com/120?text=Sunshine",
            desc: "Sunshine yellow dress—classic Spring color."
          }
        ]
      }
    ]
  }
};

export default function CelebMatches({ season }) {
  const data = SEASON_DATA[season];

  if (!data) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <h2>No celebrity matches found for: {season}</h2>
      </div>
    );
  }

  return (
    <div className="celeb-container">
      <h2 style={{ color: "#e1637a", marginBottom: "1rem" }}>
        Celebrity Matches for {season}
      </h2>

      {data.celebrities.map((celeb) => (
        <div key={celeb.name} className="celeb-card">
          <img src={celeb.image} alt={celeb.name} className="celeb-photo" />
          <h3>{celeb.name}</h3>

          {/* Outfits */}
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
