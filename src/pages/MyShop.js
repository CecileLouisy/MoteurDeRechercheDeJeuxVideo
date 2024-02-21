import { useEffect, useState } from "react";
import haversine from "../haversine";

const MyShop = () => {
  const [myShop, setMyShop] = useState({ name: "", distance: "",city:"" });

  useEffect(() => {
    const url = "https://formacitron.github.io/shopslist/shops.json";
    fetch(url)
      .then((response) => response.json())
      .then((shops) => {
        console.log(shops);

        navigator.geolocation.getCurrentPosition((position) => {
          const nearest = { distance: null, shop: null };
          for (const shop of shops) {
            const a = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const b = { lat: shop.gps_lat, lng: shop.gps_lng };

            const distance = haversine(a, b); // 714504.18 (in meters)

            if (nearest.distance === null) {
              nearest.distance = distance;
              nearest.shop = shop;
            } else {
              if (nearest.distance > distance) {
                nearest.distance = distance;
                nearest.shop = shop;
              }
            }
          }
          setMyShop({name:nearest.shop.name,
            city:nearest.shop.city,
            distance:(nearest.distance/1000).toFixed(2)});
        });
      });
  }, []);

  return (
    <div className="flex flex-col h-full text-center bg-orange-300 rounded-xl max-w-xl">
      <h1 className="text-2xl ">{myShop.name}</h1>
      <p className="flex-grow">{myShop.city}</p>
      <p>{myShop.distance} km</p>
    </div>
  );
};
export default MyShop;
