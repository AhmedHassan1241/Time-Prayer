let cities = [
  {
    ar: "الدقهلية",
    en: "Ad Daqahlīyah",
  },
  {
    ar: "البحر الاحمر",
    en: "Al Baḩr al Aḩmar",
  },
  {
    ar: "البحيرة",
    en: "Al Buḩayrah",
  },
  {
    ar: "الفيوم",
    en: "Al Fayyūm",
  },
  {
    ar: "الغربية",
    en: "Al Gharbīyah",
  },
  {
    ar: "الاسكندرية",
    en: "Al_Iskandarīyah",
  },
  {
    ar: "الاسماعلية",
    en: "Al_Ismā'īlīyah",
  },
  {
    ar: "الجيزة",
    en: "Giza",
  },
  {
    ar: "المنيا",
    en: "Al Minyā",
  },
  {
    ar: "المنوفية",
    en: "Al Minūfīyah",
  },
  {
    ar: "القليوبية",
    en: "Al Qalyūbīyah",
  },
  {
    ar: "القاهرة",
    en: "Al Qāhirah",
  },
  {
    ar: "الاقصر",
    en: "Al Uqşur",
  },
  {
    ar: "الوادي الجديد",
    en: "Al Wādī al Jadīd",
  },
  {
    ar: "السويس",
    en: "As Suways",
  },
  {
    ar: "الشرقية",
    en: "Ash Sharqīyah",
  },
  {
    ar: "اسوان",
    en: "Aswān",
  },
  {
    ar: "اسيوط",
    en: "Asyūţ",
  },
  {
    ar: "بني سويف",
    en: "Banī Suwayf",
  },
  {
    ar: "بورسعيد",
    en: "Būr Sa‘īd",
  },
  {
    ar: "دمياط",
    en: "Dumyāţ",
  },
  {
    ar: "جنوب سيناء",
    en: "Janūb Sīnā'",
  },
  {
    ar: "كفر الشيخ",
    en: "Kafr ash Shaykh",
  },
  {
    ar: "مطروح",
    en: "Maţrūḩ",
  },
  {
    ar: "قنا",
    en: "Qinā",
  },
  {
    ar: "شمال سيناء",
    en: "Shamāl Sīnā'",
  },
  {
    ar: "سوهاج",
    en: "Sawhaj",
  },
];
for (const city of cities) {
  let content = `
    <option>${city.ar}</option>`;
  document.getElementById("city").innerHTML += content;
}

document.getElementById("city").addEventListener("change", function () {
  document.getElementById("ct").innerText = this.value;
  let cName = "";
  for (const city of cities) {
    if (city.ar == this.value) {
      cName = city.en;
      break;
    }
  }
  getCity(cName);
});

function getCity(cName) {
  let params = {
    city: cName,
    country: "EG",
    method: 5,
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      timing(response.data.data.timings);
      let date = response.data.data.date.readable;
      let day = response.data.data.date.hijri.weekday.ar;
      document.getElementById("date").innerText = date + "," + day;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  function timing(time) {
    document.getElementById("fajr").innerText = time.Fajr;
    document.getElementById("sunrise").innerText = time.Sunrise;
    document.getElementById("dhuhr").innerText = time.Dhuhr;
    document.getElementById("asr").innerText = time.Asr;
    document.getElementById("maghrib").innerText = time.Maghrib;
    document.getElementById("isha").innerText = time.Isha;
  }
}
getCity("Ad Daqahlīyah");
