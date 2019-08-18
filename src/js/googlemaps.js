
const { map } = window;

const addMarker = (address) => {
  console.log(address);
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
    } else {
      console.error(status);
    }
  });
};

const extractAddresses = (data) => data.Locations;

const initGeocodingListener = () => {
  $(window).on('maps.geolocator.add.marker', (_el, data) => {
    const addresses = extractAddresses(data);
    addresses.forEach((address) => {
      if (address !== null && address !== '') {
        addMarker(address);
      }
    });
  });
};

export default initGeocodingListener;
