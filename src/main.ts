import './style.css'

import { IEpisodeResult } from './contracts/IEpisode'
import { ICharacterResult } from "./contracts/ICharacters"
import { ILocationResult } from "./contracts/ILocation"

// ! HAUPTGANG
const BASE_URL = "https://rickandmortyapi.com/api"

// ! Der Anschluss zu Character
const CHARACTER_ROUTE = `${BASE_URL}/character`

// ! Der Anschluss zu Location
const LOCATION_ROUTE = `${BASE_URL}/location`

// ! Der Anschluss zu Episode
const EPISODE_ROUTE = `${BASE_URL}/episode`

// erster Fetch: Characters ziehen
// brauche mehrere Infos aus diesem Objekt (Characters), dann brauche ich weiteren fetch, um tiefer zu gehen, um an die Infos zu kommen (z.B. residents), das geht immer nur mit mehreren async functions!
// man soll so wenig wie mögliche fetches schreiben, weils langsamer wir

const outputElement = document.getElementById("output") as HTMLDivElement;
const characterElement = document.getElementById("api-character") as HTMLAnchorElement;
const locationElement = document.getElementById("api-location") as HTMLAnchorElement;
const episodeElement = document.getElementById("api-episode") as HTMLAnchorElement;

// callback function kann auch async function sein. Response ist nichts anderes als Objekt, damit können wir so noch nichts anfangen, deshalb Umwandlung in JSON, dann erst kann der Browser es verstehen.
// Wenn true, dann wird in JSON umgewandelt.
// Wenn erster fetch durch, wird nächster fetch daran anschließen.
// Abräumen, Kellner: output.Element.innerHTML = "" 
// zum Kellner: Das ist immer so, hat mit der Ausgabe im HTML nichts zu tun, innerHTML ist hier der beste Weg! Abräumen, dann kann wieder neuer input angezeigt werden
// die beste Methode, um durch ein array zu gehen: forEach!
// innerHTML erwartet, dass ein string zurückgegeben wird
// Ebenen zu appendchild: hier oberste das output element > characterDiv > die einzelnen h4, p, p, img aus der function

characterElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(CHARACTER_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: ICharacterResult) => {
      const characterDiv = document.createElement("div") as HTMLDivElement;
      characterDiv.innerHTML = displayCharacter(result)
      outputElement.appendChild(characterDiv)
    })
  } catch (error) {
    console.error(error);
  }
})

// character.location.name -> hier noch ein Punkt vor name gesetzt, weil Location in interface eigenes interface ist
// keyword: return -> damit wir string zurückbekommen!
function displayCharacter(character: ICharacterResult): string {
  const resultAsString = `
  <h4>Name: ${character.name}</h4>
  <p>Status: ${character.status}</p>
  <p>Gender: ${character.gender}</p>
  <p>Location: ${character?.location?.name}</p>
  <img src="${character.image}" alt="${character.name}"> 
  `
  return resultAsString
}

// zur Erklärung result = Object, hat 5 Eigenschaften. die Eigenschaft resident hat aber einen Link, diesen Link will ich erreichen
// beim p tag steht residents, d.h. Name der const residents

async function displayLocation(location: ILocationResult): Promise<string> {
  // const residents = await fetchResidents(location.residents);
  const resultAsString = `
    <p>Name: ${location.name} </p>
    <p>Type: ${location.type} </p>
    <p>Residents: ${await fetchResidents(location.residents)} </p>
  `
  return resultAsString;
}

// locationResidents ist ein string array
// Beispiel Eimer Stifte einsammeln, was brauche ich, um Dinge erst mal zu sammeln: leeres array
// resident im parameter ist hier ein einzelner link, den ich aufrufen will
// warum nutzen wir hier kein forEach, sondern for of: forEach geht einfach über unser array durch, beim for of können wir was daraus holen, etwa wie map. z.b. geht resultArray.push(data.name)
// mit join kann ich umwandeln plus das Komma dazwischen entfernen .join(", ") > Komma Leerzeichen

async function fetchResidents(locationResidents: string[]): Promise<string> {
  const resultArray: string[] = []
  for (const resident of locationResidents) {
    try {
      const response = await fetch(resident)
      const data: ICharacterResult = await response.json()
      console.log(data);
      resultArray.push(data.name)
    } catch (error) {
      console.error(error);
    }
  }
  return resultArray.join(", ")
}

// weil es in dieser function um await, asynchrone function geht, müssen wir ein promise schreiben hinterher
locationElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(LOCATION_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    for (const result of data.results) {
      const locationDiv = document.createElement("div") as HTMLDivElement
      locationDiv.innerHTML = await displayLocation(result)
      outputElement.appendChild(locationDiv)
    }
  } catch (error) {
    console.error(error);
  }
})

// hier nehmen wir alternativ die map methode statt for of. map erzeugt immer ein neues array
// wir nutzen hier await, dann Promise.all, braucht in function aber auch: async. Erste Schleife: console.log(result);
// ein normales for of kann auch mit Promise.all einfach geschrieben werden
// so bekomme ich alle Episoden einfach zurück
// wann brauch ich asynchr. function? Wenn ich etwas erreichen will, was tiefer liegt, verschachtelt 
episodeElement?.addEventListener("click", async () => {
  try {
    const response = await fetch(EPISODE_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""

    await Promise.all(data.results.map(async (result: IEpisodeResult) => {
      console.log(result);
      const episodeDiv = document.createElement("div") as HTMLDivElement;
      episodeDiv.innerHTML = await displayEpisode(result)
      outputElement.appendChild(episodeDiv)
    }))
  } catch (error) {
    console.error(error);
  }
})

async function displayEpisode(episode: IEpisodeResult): Promise<string> {
  const residents = await fetchResidents(episode.characters)
  const resultAsString = `
  <p>Name:${episode.name}</p>
  <p>Air date: ${episode.air_date}</p>
  <p>Characters: ${residents}</p>
  `

  return resultAsString
}
