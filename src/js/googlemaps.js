
const { map } = window;

const codeAddress = (address) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    console.log(results);
    const latLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
    console.log(latLng);
    if (status == 'OK') {
      const marker = new google.maps.Marker({
        position: latLng,
        map,
      });
      console.log(map);
    } else {
      console.error(`Geocode was not successful for the following reason: ${status}`);
    }
  });
};

const initGeocodingListener = () => {
  $(window).on('maps.geolocator.add.marker', (_el, data) => {
    console.log(el, data);
  });
};

export default initGeocodingListener;
