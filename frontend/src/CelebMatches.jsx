import React from "react";
import "./index.css";

/*
  Hardcoded seasonal celebrity matches.
  Each celebrity has a main image and a set of outfits.
*/

const SEASON_DATA = {
  "Deep Autumn": {
    celebrities: [
      {
        name: "Zendaya",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Feuphoria.fandom.com%2Fwiki%2FZendaya&psig=AOvVaw10eOqMJPQ5MDn6GEhxxVNf&ust=1763926609681000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCLDYx_LAhpEDFQAAAAAdAAAAABAE",
        outfits: [
          {
            img: "https://cdn.shopify.com/s/files/1/0729/6214/6631/files/Neutral_Pastel_Aesthetic_Vintage_Moodboard_Photo_Collage_Grid_Instagram_Post_3_1_480x480.webp?v=1721735893",
            desc: "Rust dress with deep teal earrings."
          },
          {
            img: "https://i.pinimg.com/1200x/0b/7a/c6/0b7ac6ddd752e453192335a0fb00a7ed.jpg",
            desc: "Olive green jacket with gold accessories."
          }
        ]
      },
      {
        name: "Jason Momoa",
        image: "https://via.placeholder.com/200x250?text=Priyanka",
        outfits: [
          {
            img: "https://via.placeholder.com/120?text=Terracotta",
            desc: "Jason Momoa in his seasonal colors"
          },
        ]
      }
    ]
  },
  "Warm Autumn": {
    celebrities: [
      {
        name: "Julia Roberts",
        image: "https://m.media-amazon.com/images/M/MV5BMTQzNjU3MDczN15BMl5BanBnXkFtZTYwNzY2Njc4._V1_FMjpg_UX1000_.jpg",
        outfits: [
          {
            img: "https://cdn.shopify.com/s/files/1/0794/7776/8518/files/4_20b44500-ba26-41de-86ab-b78ee930d9f4.png?v=1757601573",
            desc: "."
          },
          {
            img: "https://imageconsultantmaidenhead.co.uk/cdn/shop/articles/2_82696ef8-5855-4f7e-a132-d59be6b0733a.png?v=1757601979",
            desc: "Olive green jacket with gold accessories."
          }
        ]
      },
      {
        name: "Bruno Mars",
        image: "https://m.media-amazon.com/images/M/MV5BMjE1NDE3ODA0MV5BMl5BanBnXkFtZTcwODQ5NTgwNQ@@._V1_.jpg",
        outfits: [
          {
            img: "https://thealignedlover.com/wp-content/uploads/2025/02/5-5-1024x576.jpg",
            desc: "Jason Momoa in his seasonal colors"
          },
        ]
      }
    ]
  },
  "Soft Autumn": {
    celebrities: [
      {
        name: "Gisele Bundchen ",
        image: "https://cdn.shopify.com/s/files/1/0729/6214/6631/files/Minimal_Aesthetic_Story_Highlight_Covers_Your_Story_43_1_480x480.webp?v=1726932905",
        outfits: [
          {
            img: "https://fourseasons.studio/cdn/shop/articles/Minimal_Aesthetic_Story_Highlight_Covers_Your_Story_42_1_1200x1200.webp?v=1726939083",
            desc: ""
          },
        ]
      },
      {
        name: "Ryan Reynolds",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg",
        outfits: [
          {
            img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.esquire.com%2Fstyle%2Fmens-fashion%2Fg20703481%2Fryan-reynolds-style-fashion-outfits%2F&psig=AOvVaw00BMy3cLDyO-Osnqtayu7R&ust=1763928294852000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCOCC9ZDHhpEDFQAAAAAdAAAAABAL",
            desc: "."
          },
        ]
      }
    ]
  },
  "Bright Spring": {
    celebrities: [
      {
        name: "Vanessa Hudgens",
        image: "https://i.pinimg.com/474x/4f/c8/16/4fc816e1d46e6086cf589a4447c0c1f6.jpg",
        outfits: [
          {
            img: "https://cdn.shopify.com/s/files/1/0729/6214/6631/files/Neutral_Pastel_Aesthetic_Vintage_Moodboard_Photo_Collage_Grid_Instagram_Post_22_480x480.webp?v=1721490158",
            desc: "hd"
          },
        ]
      },
      {
        name: "Zac Efron",
        image: "https://cdn.britannica.com/33/215033-050-70D7B4A3/American-actor-Zac-Efron-2017.jpg",
        outfits: [
          {
            img: "https://thevou.com/wp-content/uploads/2024/08/Zac-Efron-Bright-Spring-colour-palette.jpg",
            desc: "."
          },
        ]
      }
    ]
  },
  "Light Spring": {
    celebrities: [
      {
        name: "Elsa Hosk ",
        image: "https://58v76y8z87lo.hellomagazine.com/horizon/landscape/51d6a46ade9f-gettyimages-2244624405.jpg",
        outfits: [
          {
            img: "https://cdn.shopify.com/s/files/1/0729/6214/6631/files/Neutral_Pastel_Aesthetic_Vintage_Moodboard_Photo_Collage_Grid_Instagram_Post_18_deff22d8-673d-4539-aff1-3ce171e5277f_480x480.webp?v=1721314667",
            desc: ""
          },
        ]
      },
      {
        name: "Chris Pine",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Chris_Pine_%2843043463084%29_%28cropped%29.jpg",
        outfits: [
          {
            img: "https://thevou.com/wp-content/uploads/2024/09/Chris-Pine-Light-Spring-Seasonal-Colour-Style.jpg",
            desc: "."
          },
        ]
      }
    ]
  },
  "Warm Spring": {
    celebrities: [
      {
        name: "Blake Lively ",
        image: "https://m.media-amazon.com/images/M/MV5BMTU2Njk0NTUyNl5BMl5BanBnXkFtZTcwODE0OTgyNw@@._V1_.jpg",
        outfits: [
          {
            img: "https://fourseasons.studio/cdn/shop/articles/Minimal_Aesthetic_Story_Highlight_Covers_Your_Story_-_2024-10-21T225359.828_1200x1200.webp?v=1729523503",
            desc: ""
          },
        ]
      },
      {
        name: "Pedro Pascal",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Pedro_Pascal_at_the_2025_Cannes_Film_Festival_05.jpg/960px-Pedro_Pascal_at_the_2025_Cannes_Film_Festival_05.jpg",
        outfits: [
          {
            img: "https://media.gq.com/photos/63ff98d207f0feb01b2e1684/master/pass/pedro.jpg",
            desc: "."
          },
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
      <h2 style={{ color: "#e1637a", marginBottom: "2rem",fontSize: "40px"}}>
        Celebrity Matches for {normalizedSeason}
      </h2>

{data.celebrities.length >= 2 && (
  <>
 {/* First celeb */}
<div key={data.celebrities[0].name} className="celeb-card">
  <img
    src={data.celebrities[0].image}
    alt={data.celebrities[0].name}
    className="celeb-photo"
  />
  <h3 style={{ fontSize: "2rem", fontWeight: "600" }}>
    {data.celebrities[0].name}
  </h3>
  <div className="outfit-row">
    {data.celebrities[0].outfits.map((o, i) => (
      <div key={i} className="outfit-card">
        <img src={o.img} alt="Outfit" className="outfit-image" />
        <p style={{ fontSize: "1.3rem" }}>{o.desc}</p>
      </div>
    ))}
  </div>
</div>

{/* Second celeb */}
<div key={data.celebrities[1].name} className="celeb-card">
  <img
    src={data.celebrities[1].image}
    alt={data.celebrities[1].name}
    className="celeb-photo"
  />
  <h3 style={{ fontSize: "2rem", fontWeight: "600" }}>
    {data.celebrities[1].name}
  </h3>
  <div className="outfit-row">
    {data.celebrities[1].outfits.map((o, i) => (
      <div key={i} className="outfit-card">
        <img src={o.img} alt="Outfit" className="outfit-image" />
        <p style={{ fontSize: "1.3rem" }}>{o.desc}</p>
      </div>
    ))}
  </div>
</div>

  </>
)}

    </div>


  );
}
