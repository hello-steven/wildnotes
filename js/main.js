const app = new Vue({
  el: '#wild_notes',
  data () {
    return {
      allow_geolocation: false
    }
  },
  methods: {
    initGeolocation () {
      initMap(); 
      this.allow_geolocation = true;
    } 
  }
});
