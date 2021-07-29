import LocalizedStrings from "react-localization";
import en from "./strings_en.json";
import es from "./strings_es.json";

function createLocalesStrings() {
  let paramLang = new URLSearchParams(window.location.search).get("lang");
  if (paramLang) localStorage.setItem("rfms.lang", paramLang);

  var storedLang = localStorage.getItem("rfms.lang");
  let strings = new LocalizedStrings({en, es});
  strings.setLanguage(storedLang ? storedLang : 'en');
  console.log("created LocalizedStrings (" + storedLang + ")")
  return strings;
}

const strings = createLocalesStrings();

export default strings;