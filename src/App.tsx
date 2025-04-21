import { useState, useRef, useEffect } from 'react'
import './App.css'
import { ImageOverlay, MapContainer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Icon, LatLngBoundsExpression, LatLngExpression, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios';

let map: Map | null;
const position: LatLngExpression = [382, 540];
const crs = L.CRS.Simple;
const bounds: LatLngBoundsExpression = [[0, 0], [763, 1080]];
const urlMap: string = "/Kanto_Map.webp";
const pokeballIcon: Icon = new Icon({
  iconUrl: "/pokeball.svg",
  iconSize: [30, 30]
});

function App() {

  type locationType = {
    location_area: {
      name: string;
    }
  }
  type pokemonResultType = {
    name: string,
    number: number,
  }
  type markerType = {
    position: [number, number],
    name: string,
    content: string,
  }
  type imgType = {
    name: string,
    imgs: [string | undefined],
  }
  type cardType = {
    name: string,
    img: string,
  }

  const pokes: pokemonResultType[] = [
    { name: "Bulbasaur", number: 1 },
    { name: "Ivysaur", number: 2 },
    { name: "Venusaur", number: 3 },
    { name: "Charmander", number: 4 },
    { name: "Charmeleon", number: 5 },
    { name: "Charizard", number: 6 },
    { name: "Squirtle", number: 7 },
    { name: "Wartortle", number: 8 },
    { name: "Blastoise", number: 9 },
    { name: "Caterpie", number: 10 },
    { name: "Metapod", number: 11 },
    { name: "Butterfree", number: 12 },
    { name: "Weedle", number: 13 },
    { name: "Kakuna", number: 14 },
    { name: "Beedrill", number: 15 },
    { name: "Pidgey", number: 16 },
    { name: "Pidgeotto", number: 17 },
    { name: "Pidgeot", number: 18 },
    { name: "Rattata", number: 19 },
    { name: "Raticate", number: 20 },
    { name: "Spearow", number: 21 },
    { name: "Fearow", number: 22 },
    { name: "Ekans", number: 23 },
    { name: "Arbok", number: 24 },
    { name: "Pikachu", number: 25 },
    { name: "Raichu", number: 26 },
    { name: "Sandshrew", number: 27 },
    { name: "Sandslash", number: 28 },
    { name: "Nidoran♀", number: 29 },
    { name: "Nidorina", number: 30 },
    { name: "Nidoqueen", number: 31 },
    { name: "Nidoran♂", number: 32 },
    { name: "Nidorino", number: 33 },
    { name: "Nidoking", number: 34 },
    { name: "Clefairy", number: 35 },
    { name: "Clefable", number: 36 },
    { name: "Vulpix", number: 37 },
    { name: "Ninetales", number: 38 },
    { name: "Jigglypuff", number: 39 },
    { name: "Wigglytuff", number: 40 },
    { name: "Zubat", number: 41 },
    { name: "Golbat", number: 42 },
    { name: "Oddish", number: 43 },
    { name: "Gloom", number: 44 },
    { name: "Vileplume", number: 45 },
    { name: "Paras", number: 46 },
    { name: "Parasect", number: 47 },
    { name: "Venonat", number: 48 },
    { name: "Venomoth", number: 49 },
    { name: "Diglett", number: 50 },
    { name: "Dugtrio", number: 51 },
    { name: "Meowth", number: 52 },
    { name: "Persian", number: 53 },
    { name: "Psyduck", number: 54 },
    { name: "Golduck", number: 55 },
    { name: "Mankey", number: 56 },
    { name: "Primeape", number: 57 },
    { name: "Growlithe", number: 58 },
    { name: "Arcanine", number: 59 },
    { name: "Poliwag", number: 60 },
    { name: "Poliwhirl", number: 61 },
    { name: "Poliwrath", number: 62 },
    { name: "Abra", number: 63 },
    { name: "Kadabra", number: 64 },
    { name: "Alakazam", number: 65 },
    { name: "Machop", number: 66 },
    { name: "Machoke", number: 67 },
    { name: "Machamp", number: 68 },
    { name: "Bellsprout", number: 69 },
    { name: "Weepinbell", number: 70 },
    { name: "Victreebel", number: 71 },
    { name: "Tentacool", number: 72 },
    { name: "Tentacruel", number: 73 },
    { name: "Geodude", number: 74 },
    { name: "Graveler", number: 75 },
    { name: "Golem", number: 76 },
    { name: "Ponyta", number: 77 },
    { name: "Rapidash", number: 78 },
    { name: "Slowpoke", number: 79 },
    { name: "Slowbro", number: 80 },
    { name: "Magnemite", number: 81 },
    { name: "Magneton", number: 82 },
    { name: "Farfetch'd", number: 83 },
    { name: "Doduo", number: 84 },
    { name: "Dodrio", number: 85 },
    { name: "Seel", number: 86 },
    { name: "Dewgong", number: 87 },
    { name: "Grimer", number: 88 },
    { name: "Muk", number: 89 },
    { name: "Shellder", number: 90 },
    { name: "Cloyster", number: 91 },
    { name: "Gastly", number: 92 },
    { name: "Haunter", number: 93 },
    { name: "Gengar", number: 94 },
    { name: "Onix", number: 95 },
    { name: "Drowzee", number: 96 },
    { name: "Hypno", number: 97 },
    { name: "Krabby", number: 98 },
    { name: "Kingler", number: 99 },
    { name: "Voltorb", number: 100 },
    { name: "Electrode", number: 101 },
    { name: "Exeggcute", number: 102 },
    { name: "Exeggutor", number: 103 },
    { name: "Cubone", number: 104 },
    { name: "Marowak", number: 105 },
    { name: "Hitmonlee", number: 106 },
    { name: "Hitmonchan", number: 107 },
    { name: "Lickitung", number: 108 },
    { name: "Koffing", number: 109 },
    { name: "Weezing", number: 110 },
    { name: "Rhyhorn", number: 111 },
    { name: "Rhydon", number: 112 },
    { name: "Chansey", number: 113 },
    { name: "Tangela", number: 114 },
    { name: "Kangaskhan", number: 115 },
    { name: "Horsea", number: 116 },
    { name: "Seadra", number: 117 },
    { name: "Goldeen", number: 118 },
    { name: "Seaking", number: 119 },
    { name: "Staryu", number: 120 },
    { name: "Starmie", number: 121 },
    { name: "Mr. Mime", number: 122 },
    { name: "Scyther", number: 123 },
    { name: "Jynx", number: 124 },
    { name: "Electabuzz", number: 125 },
    { name: "Magmar", number: 126 },
    { name: "Pinsir", number: 127 },
    { name: "Tauros", number: 128 },
    { name: "Magikarp", number: 129 },
    { name: "Gyarados", number: 130 },
    { name: "Lapras", number: 131 },
    { name: "Ditto", number: 132 },
    { name: "Eevee", number: 133 },
    { name: "Vaporeon", number: 134 },
    { name: "Jolteon", number: 135 },
    { name: "Flareon", number: 136 },
    { name: "Porygon", number: 137 },
    { name: "Omanyte", number: 138 },
    { name: "Omastar", number: 139 },
    { name: "Kabuto", number: 140 },
    { name: "Kabutops", number: 141 },
    { name: "Aerodactyl", number: 142 },
    { name: "Snorlax", number: 143 },
    { name: "Articuno", number: 144 },
    { name: "Zapdos", number: 145 },
    { name: "Moltres", number: 146 },
    { name: "Dratini", number: 147 },
    { name: "Dragonair", number: 148 },
    { name: "Dragonite", number: 149 },
    { name: "Mewtwo", number: 150 },
    { name: "Mew", number: 151 }
  ];
  
  useEffect(() => {
    usePokemonInMap("rattata");
    usePokemonInMap("pidgey");
    usePokemonInMap("tentacool");
    usePokemonInMap("primeape");
  }, []);

  const markerRefs = useRef<L.Marker[]>([]);

  const [markersData, setMarkersData] = useState<markerType[]>([
    { position: [519, 518], name: "celadon-city", content: "Celadon City" },
    { position: [493, 709], name: "saffron-city", content: "Saffron City" },
    { position: [264, 266], name: "pallet-town", content: "Pallet Town" },
    { position: [62, 246], name: "cinnabar-island", content: "Cinnabar Island" },
    { position: [155, 542], name: "fuchsia-city", content: "Fuchsia City" },
    { position: [352, 708], name: "vermillion-city", content: "Vermillion City" },
    { position: [340, 264], name: "kanto-route-1", content: "Route 1" },
    { position: [472, 264], name: "kanto-route-2", content: "Route 2" },
    { position: [598, 394], name: "kanto-route-3", content: "Route 3" },
    { position: [626, 598], name: "kanto-route-4", content: "Route 4" },
    { position: [578, 710], name: "kanto-route-5", content: "Route 5" },
    { position: [451, 710], name: "kanto-route-6", content: "Route 6" },
    { position: [494, 644], name: "kanto-route-7", content: "Route 7" },
    { position: [494, 821], name: "kanto-route-8", content: "Route 8" },
    { position: [626, 842], name: "kanto-route-9", content: "Route 9" },
    { position: [548, 948], name: "kanto-route-10", content: "Route 10" },
    { position: [349, 862], name: "kanto-route-11", content: "Route 11" },
    { position: [413, 980], name: "kanto-route-12", content: "Route 12" },
    { position: [232, 870], name: "kanto-route-13", content: "Route 13" },
    { position: [180, 768], name: "kanto-route-14", content: "Route 14" },
    { position: [153, 632], name: "kanto-route-15", content: "Route 15" },
    { position: [524, 440], name: "kanto-route-16", content: "Route 16" },
    { position: [388, 389], name: "kanto-route-17", content: "Route 17" },
    { position: [153, 467], name: "kanto-route-18", content: "Route 18" },
    { position: [113, 544], name: "kanto-sea-route-19", content: "Route 19" },
    { position: [53, 488], name: "kanto-sea-route-20", content: "Route 20" },
    { position: [140, 244], name: "kanto-sea-route-21", content: "Route 21" },
    { position: [412, 177], name: "kanto-route-22", content: "Route 22" },
    { position: [474, 136], name: "kanto-route-23", content: "Route 23" },
    { position: [680, 708], name: "kanto-route-24", content: "Route 24" },
    { position: [719, 772], name: "kanto-route-25", content: "Route 25" },
  ]);

  const [imgsData, setImgsData] = useState<imgType[]>([
    { name: "celadon-city", imgs: [undefined] },
    { name: "saffron-city", imgs: [undefined] },
    { name: "pallet-town", imgs: [undefined] },
    { name: "cinnabar-island", imgs: [undefined] },
    { name: "fuchsia-city", imgs: [undefined] },
    { name: "vermillion-city", imgs: [undefined] },
    { name: "kanto-route-1", imgs: [undefined] },
    { name: "kanto-route-2", imgs: [undefined] },
    { name: "kanto-route-3", imgs: [undefined] },
    { name: "kanto-route-4", imgs: [undefined] },
    { name: "kanto-route-5", imgs: [undefined] },
    { name: "kanto-route-6", imgs: [undefined] },
    { name: "kanto-route-7", imgs: [undefined] },
    { name: "kanto-route-8", imgs: [undefined] },
    { name: "kanto-route-9", imgs: [undefined] },
    { name: "kanto-route-10", imgs: [undefined] },
    { name: "kanto-route-11", imgs: [undefined] },
    { name: "kanto-route-12", imgs: [undefined] },
    { name: "kanto-route-13", imgs: [undefined] },
    { name: "kanto-route-14", imgs: [undefined] },
    { name: "kanto-route-15", imgs: [undefined] },
    { name: "kanto-route-16", imgs: [undefined] },
    { name: "kanto-route-17", imgs: [undefined] },
    { name: "kanto-route-18", imgs: [undefined] },
    { name: "kanto-sea-route-19", imgs: [undefined] },
    { name: "kanto-sea-route-20", imgs: [undefined] },
    { name: "kanto-sea-route-21", imgs: [undefined] },
    { name: "kanto-route-22", imgs: [undefined] },
    { name: "kanto-route-23", imgs: [undefined] },
    { name: "kanto-route-24", imgs: [undefined] },
    { name: "kanto-route-25", imgs: [undefined] },
  ]);
  
  const [cardsData, setCardsData] = useState<cardType[]>([]);


  function setCards(pokemon: string) {
      axios.get("https://api.pokemontcg.io/v2/cards?q=name:" + pokemon + "&page=1&pageSize=20")
        .then(response => {
          if (response.status == 200) {
            const updatedCards: cardType[] = [];
            response.data.data.forEach((cardData: any) => {
              let card: cardType = {
                name: cardData.name,
                img: cardData.images.small,
              };
              updatedCards.push(card);
            });
            setCardsData(updatedCards);
          }
        });
  }
  
  
  
  function getPokemonIcon(pokemonNumber: number, id: number) {
    const updatedImgs = [...imgsData];
    let random =  Math.floor(Math.random() * 8);
    console.log("Mathhhh");
    console.log(random);
    let pokemonUrl;
    if(random != 7) pokemonUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + pokemonNumber + ".png"
    else pokemonUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" + pokemonNumber + ".png"
    updatedImgs[id].imgs.push(pokemonUrl);
    setImgsData(updatedImgs);
  }
  const usedPokemons = useRef(new Set<string>());
  function usePokemonInMap(pokemon: string) {
    
    console.log(usedPokemons);
    console.log(usedPokemons.current.has(pokemon.toLowerCase()));
    if(!usedPokemons.current.has(pokemon.toLowerCase())){
      
      axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon + "/encounters")
        .then(response => {
          if (response.status == 200) {
            response.data.forEach((location: locationType) => {
              markersData.forEach((marker, i) => {
                if (location.location_area.name.includes(marker.name + "-")) {
                  imgsData.forEach(img => {
                    if (img.name == marker.name) {
                      let pokemonResult: pokemonResultType | undefined = pokes.find(({ name }) => name.toLowerCase() == pokemon.toLowerCase());
                      if (pokemonResult ) {
                        getPokemonIcon(pokemonResult.number, i);
                        usedPokemons.current.add(pokemon.toLowerCase());
                      }
                    }
                  });
                }

              });

            });
          }
        });
      }
      
    setCards(pokemon.toLowerCase());
  }

  function globalFunc() {
    let namePoke: HTMLInputElement = document.getElementById("inputPoke") as HTMLInputElement;
    usePokemonInMap(namePoke.value);
  }

  const Zoomer = () => {
    const mapEvents = useMapEvents({

      zoomend: () => {

        if (mapEvents.getZoom() > 0) {
          mapEvents.dragging.enable();
          console.log("No zoom")
        }
        else {
          mapEvents.dragging.disable();
          mapEvents.setView(position);
          console.log("zoom")
        }
      },
    });

    return null;
  }
  

  return (
    <>
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="inputPoke">Pokemon para localizar/ver cartas:</label>
          <input type="text" name='inputPoke' id='inputPoke' />
          <button onClick={globalFunc}>Enviar</button>
        </form>
      </div>
      <div id='container'>
        <MapContainer
          ref={(ref) => { map = ref }}
          id="mapContainer"
          crs={crs}
          center={position}
          zoom={0}
          style={{ height: '763px', width: '1080px' }}
          bounds={bounds}
          dragging={false}>

          {markersData.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position as LatLngExpression}
              icon={pokeballIcon}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[index] = ref;
                }
              }}
            >
              <Popup key={marker.name}>
                {marker.content} <br />
                {imgsData.map(imgData => (
                  marker.name === imgData.name && imgData.imgs.map((img, i) => (
                    <img height={30} src={img} key={i} />
                  ))
                ))}
              </Popup>


            </Marker>
          ))}
          <ImageOverlay url={urlMap} bounds={bounds} />
          <Zoomer />
        </MapContainer>

        <div id='gridCards'>
          {cardsData.map(card => (
            <div className='cardDiv' key={card.img}>
              <h2>{card.name}</h2>
              <img src={card.img} alt={card.name} />
            </div>
          ))

          }
        </div>
      </div>
    </>
  );
}
export default App
