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
        image: "./public/celebrityphotos/Z.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/dafemale.PNG",
            desc: "Zendaya in reddish and brownish autumn hues."
          }
        ]
      },
      {
        name: "Jason Momoa",
        image: "./public/celebrityphotos/JM.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/damale.PNG",
            desc: "Jason Momoa in brownish autumn hues"
          }
        ]
      }
    ]
  },
  
  "True Autumn": {
    celebrities: [
      {
        name: "Julia Roberts",
        image: "./public/celebrityphotos/JR.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/tafemale.PNG",
            desc: "Auburn and Navy Blue suit."
          }
        ]
      },
      {
        name: "Bruno Mars",
        image: "./public/celebrityphotos/BB.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/tamale.PNG",
            desc: "Mars in yellow, blue and red color combo."
          }
        ]
      }
    ]
  },
  "Bright Spring": {
    celebrities: [
      {
        name: "Vanessa Hudgens",
        image: "./public/celebrityphotos/VH.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/bsfemale.PNG",
            desc: "Red and Pink spring gowns."
          }
        ]
      },
      {
        name: "Zac Efron",
        image: "./public/celebrityphotos/ZE.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/bsmale.PNG",
            desc: "Zac Efron in bright spring red and blue ."
          }
        ]
      }
    ]
  },
  "Light Spring": {
    celebrities: [
      {
        name: "Elsa Hosk",
        image: "./public/celebrityphotos/EH.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/lsfemale.PNG",
            desc: "Soft pastel green and blue sets."
          }
        ]
      },
      {
        name: "Chris Pine",
        image: "./public/celebrityphotos/CP.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/lsmale.PNG",
            desc: "Peach and pastel rainbow hues."
          }
        ]
      }
    ]
  },

  "True Spring": {
    celebrities: [
      {
        name: "Blake Lively",
        image: "./public/celebrityphotos/BL.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/tsfemale.PNG",
            desc: "True orange and true blue suit."
          }
        ]
      },
      {
        name: "Pedro Pascal",
        image: "./public/celebrityphotos/PP.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/tsmale.PNG",
            desc: "Pedro Pascal in true spring yellow, brown and gray hues."
          }
        ]
      }
    ]
  },

  "Soft Autumn": {
    celebrities: [
      {
        name: "Gisele Bundchen",
        image: "./public/celebrityphotos/GB.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/safemale.PNG",
            desc: "Lavendar button-down and Cobalt blue suit."
          }
        ]
      },
      {
        name: "Ryan Reynolds",
        image: "./public/celebrityphotos/RR.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/samale.PNG",
            desc: "Hot pink dress for a crisp Winter pop."
          }
        ]
      }
    ]
  },
  "True Winter": {
    celebrities: [
      {
        name: "Henry Golding",
        image: "./public/celebrityphotos/henrygolding.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/truewintermale.PNG",
            desc: "Lavendar button-down and Cobalt blue suit."
          }
        ]
      },
      {
        name: "Jodie-Turner Smith",
        image: "./public/celebrityphotos/jodiesmith.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/truewinterfemale.PNG",
            desc: "Hot pink dress for a crisp Winter pop."
          }
        ]
      }
    ]
  },
  "Dark Winter": {
    celebrities: [
      {
        name: "Tom Cruise",
        image: "./public/celebrityphotos/tomcruise.JPG",
        outfits: [
          {
            img: "./public/celebrityphotos/darkwintermale.PNG",
            desc: "Dark blue suit and maroon set."
          }
        ]
      },
      {
        name: "Salma Hayek",
        image: "./public/celebrityphotos/salmahayek.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/darkwinterfemale.PNG",
            desc: "Dark purple and maroon gown."
          }
        ]
      }
    ]
  },
  "Bright Winter": {
    celebrities: [
      {
        name: "Megan Fox",
        image: "./public/celebrityphotos/meganfox.JPG",
        outfits: [
          {
            img: "./public/celebrityphotos/brightwinterfemale.PNG",
            desc: "Bright blue and red set for a pop."
          }
        ]
      },
      {
        name: "Lance Gross",
        image: "./public/celebrityphotos/lancegross.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/brightwintermale.PNG",
            desc: "Emerald suit and red sportswear."
          }
        ]
      }
    ]
  },

  "Light Summmer": {
    celebrities: [
      {
        name: "Princess Diana",
        image: "./public/celebrityphotos/princessdiana.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/lightsummerfemale.PNG",
            desc: "Pastel blue and light pink set."
          }
        ]
      },
      {
        name: "Ryan Gosling",
        image: "./public/celebrityphotos/ryangosling.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/lightsummermale.PNG",
            desc: "Pastel blue and cyan suit."
          }
        ]
      }
    ]
  },

  "True Summmer": {
    celebrities: [
      {
        name: "Megan Boone",
        image: "./public/celebrityphotos/meganboone.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/truesummerfemale.JPG",
            desc: "Bright red crop top and drak blue gown."
          }
        ]
      },
      {
        name: "Matt Bomer",
        image: "./public/celebrityphotos/mattbomer.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/truesummermale.PNG",
            desc: "Blue and turquoise suit."
          }
        ]
      }
    ]
  },

  "Soft Summmer": {
    celebrities: [
      {
        name: "Karisma Kapoor",
        image: "./public/celebrityphotos/karismakapoor5064.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/softsummerfemale.JPG",
            desc: "Bright red crop top and drak blue gown."
          }
        ]
      },
      {
        name: "Daniel Kim",
        image: "./public/celebrityphotos/danielkim.PNG",
        outfits: [
          {
            img: "./public/celebrityphotos/softsummermale.PNG",
            desc: "Blue and turquoise suit."
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
