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

  methods: {
    clickCard(card) {
      console.log("click");
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
        console.log("match");
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
    }
  }
});
