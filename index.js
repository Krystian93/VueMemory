Vue.component("card", {
  props: {
    card: Object
  },

  methods: {
    clickCard() {
      if (!this.card.show) {
        this.$emit("click-card", this.card);
      }
    }
  },


  template: ` 
    <div @click="clickCard"  class="card" :style="{backgroundColor: card.show ? card.color : 'silver'}">
    </div>
  `
});

const app = new Vue({
  name: "board",
  el: "#board",

  data: {
    clickedCards: [],
    showingCards: false,

    cards: [
      { id: 1, color: "#9E2B25", show: false },
      { id: 2, color: "#9E2B25", show: false },
      { id: 3, color: "#51355A", show: false },
      { id: 4, color: "#51355A", show: false },
      { id: 5, color: "#43AA8B", show: false },
      { id: 6, color: "#43AA8B", show: false },
      { id: 7, color: "#B2B09B", show: false },
      { id: 8, color: "#B2B09B", show: false }
    ]
  },

  created() {
    this.shuffle(this.cards);
  },
  updated() {
   console.log('parent forced to updete');
  },


  methods: {
    clickCard(card) {
      if (this.showingCards === false) {
        if (this.clickedCards.length != 2) {
          card.show = true;
          this.clickedCards.push(card);
        }
        if (this.clickedCards.length == 2) {
          this.checkCards();
        }
      }
    },

    checkCards() {
      if (this.clickedCards[0].color === this.clickedCards[1].color) {
        this.clickedCards = [];
      } else {
        this.showingCards = true;
        setTimeout(() => {
          this.clickedCards[0].show = false;
          this.clickedCards[1].show = false;
          this.clickedCards = [];
          this.showingCards = false;
        }, 1000);
      }
    },


//The modern version of the Fisher–Yates shuffle
    shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },


    restartGame(){
      if(!this.showingCards){
        this.cards.forEach(card=>card.show = false);
        this.clickedCards = [];
        this.showingCards = false;
        this.cards = this.shuffle(this.cards);
          this.$forceUpdate(); // little hack - parent component is not updating when items in cards array are chaning places..
      }
    },

  }
});
