const mongoose = require("mongoose");
const Hero = require("../models/heroModel");
require("dotenv").config();

const heroesData = [
  {
    name: "Captain Vikram Batra",
    title: "Param Vir Chakra",
    years: "1974 - 1999",
    category: "Army",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    bio: "Captain Vikram Batra was an officer of the Indian Army who fought in the Kargil War of 1999. Known for the famous words 'Yeh Dil Maange More', he led a successful mission to capture Point 5140 and later sacrificed his life while rescuing a fellow officer. His bravery and leadership continue to inspire generations.",
    timeline: [
      { year: "1974", event: "Born in Palampur, Himachal Pradesh" },
      { year: "1996", event: "Commissioned into 13 JAK Rifles" },
      { year: "1999", event: "Led assault on Point 5140 during Kargil War" },
      { year: "1999", event: "Martyred while rescuing fellow officer" },
      { year: "2000", event: "Awarded Param Vir Chakra posthumously" }
    ]
  },
  {
    name: "Major Sandeep Unnikrishnan",
    title: "Ashoka Chakra",
    years: "1977 - 2008",
    category: "Army",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    bio: "Major Sandeep Unnikrishnan was a National Security Guard officer who led the operation during the 2008 Mumbai attacks. He rescued several hostages before sacrificing his life while fighting terrorists inside the Taj Hotel. His last words 'Do not come up, I will handle them' exemplify his courage.",
    timeline: [
      { year: "1977", event: "Born in Bangalore, Karnataka" },
      { year: "1999", event: "Commissioned into 7th Battalion, Bihar Regiment" },
      { year: "2003", event: "Joined National Security Guard" },
      { year: "2008", event: "Led operation during Mumbai terror attacks" },
      { year: "2009", event: "Awarded Ashoka Chakra posthumously" }
    ]
  },
  {
    name: "Captain Manoj Kumar Pandey",
    title: "Param Vir Chakra",
    years: "1975 - 1999",
    category: "Army",
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=400",
    bio: "Captain Manoj Kumar Pandey was awarded the Param Vir Chakra for his bravery during the Kargil War. He led multiple assaults on enemy positions despite severe injuries and captured strategic bunkers before being martyred. His motto was 'Some goals are so worthy, it's glorious even to fail'.",
    timeline: [
      { year: "1975", event: "Born in Sitapur, Uttar Pradesh" },
      { year: "1997", event: "Commissioned into 1/11 Gorkha Rifles" },
      { year: "1999", event: "Led assault on Jubar Top during Kargil War" },
      { year: "1999", event: "Captured Khalubar hills despite injuries" },
      { year: "2000", event: "Awarded Param Vir Chakra posthumously" }
    ]
  },
  {
    name: "Field Marshal Sam Manekshaw",
    title: "Chief of Army Staff",
    years: "1914 - 2008",
    category: "Army",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    bio: "Field Marshal Sam Manekshaw was the Chief of Army Staff during the 1971 Indo-Pak war which led to the creation of Bangladesh. He is widely regarded as one of India's greatest military leaders. His strategic brilliance and leadership qualities made him a legend in Indian military history.",
    timeline: [
      { year: "1914", event: "Born in Amritsar, Punjab" },
      { year: "1934", event: "Commissioned into British Indian Army" },
      { year: "1969", event: "Appointed Chief of Army Staff" },
      { year: "1971", event: "Led India to victory in Bangladesh Liberation War" },
      { year: "1973", event: "Promoted to Field Marshal" },
      { year: "2008", event: "Passed away at age 94" }
    ]
  },
  {
    name: "Captain Anuj Nayyar",
    title: "Maha Vir Chakra",
    years: "1975 - 1999",
    category: "Army",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
    bio: "Captain Anuj Nayyar was an Indian Army officer who fought bravely in the Kargil War. He destroyed multiple enemy bunkers before being martyred while leading his troops during the battle. His determination and courage in the face of adversity remain an inspiration.",
    timeline: [
      { year: "1975", event: "Born in New Delhi" },
      { year: "1997", event: "Commissioned into 17 Jat Regiment" },
      { year: "1999", event: "Participated in Operation Vijay" },
      { year: "1999", event: "Led assault on Tiger Hill" },
      { year: "2000", event: "Awarded Maha Vir Chakra posthumously" }
    ]
  },
  {
    name: "Lieutenant Arun Khetarpal",
    title: "Param Vir Chakra",
    years: "1950 - 1971",
    category: "Army",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Lieutenant Arun Khetarpal displayed extraordinary bravery during the Indo-Pak war of 1971. Despite heavy enemy fire and a damaged tank, he continued fighting until his last breath. He destroyed several enemy tanks and prevented a breakthrough, saving countless lives.",
    timeline: [
      { year: "1950", event: "Born in Pune, Maharashtra" },
      { year: "1971", event: "Commissioned into 17 Poona Horse" },
      { year: "1971", event: "Battle of Basantar during Indo-Pak War" },
      { year: "1971", event: "Destroyed multiple enemy tanks" },
      { year: "1972", event: "Awarded Param Vir Chakra posthumously" }
    ]
  },
  {
    name: "Wing Commander Abhinandan Varthaman",
    title: "Vir Chakra",
    years: "1983 - Present",
    category: "Air Force",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
    bio: "Wing Commander Abhinandan Varthaman is an Indian Air Force pilot known for shooting down a Pakistani F-16 during the 2019 aerial conflict before being captured and later returned to India. His composure during captivity and bravery in combat earned him national recognition.",
    timeline: [
      { year: "1983", event: "Born in Chennai, Tamil Nadu" },
      { year: "2004", event: "Commissioned into Indian Air Force" },
      { year: "2019", event: "Shot down Pakistani F-16 in aerial combat" },
      { year: "2019", event: "Captured and later released by Pakistan" },
      { year: "2019", event: "Awarded Vir Chakra" }
    ]
  },
  {
    name: "Commander Abhilash Tomy",
    title: "Naval Officer & Sailor",
    years: "1979 - Present",
    category: "Navy",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Commander Abhilash Tomy is an Indian Navy officer and the first Indian to complete a solo non-stop circumnavigation of the globe under sail. His achievement showcases the spirit of adventure and determination that defines the Indian Navy.",
    timeline: [
      { year: "1979", event: "Born in Kerala" },
      { year: "2001", event: "Commissioned into Indian Navy" },
      { year: "2013", event: "Completed solo circumnavigation of globe" },
      { year: "2018", event: "Participated in Golden Globe Race" },
      { year: "2019", event: "Awarded Kirti Chakra" }
    ]
  }
];

async function seedHeroes() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/armydata"
    );
    console.log("✅ Connected to MongoDB");

    // Clear existing heroes
    await Hero.deleteMany({});
    console.log("🗑️  Cleared existing heroes");

    // Insert new heroes
    await Hero.insertMany(heroesData);
    console.log("✅ Successfully seeded heroes data");
    console.log(`📊 Total heroes added: ${heroesData.length}`);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding heroes:", error);
    process.exit(1);
  }
}

seedHeroes();
