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
    points:0,
    numberOfCards:6, 

    cards: []
  },


  created() {
    this.generateCards();
    this.shuffle(this.cards);
  },


  methods: {

    generateCards(){
       let idOfCard = 0;
       
        for(let i = 1 ; i <= this.numberOfCards ; i++){
          let color = '#'+Math.floor(Math.random()*16777215).toString(16);

          for(let j = 1 ; j<=2 ; j++){
            this.cards.push({
              id:idOfCard,
              color:color,
              show:false,
            })
            idOfCard++;
          }
        }

        
    },

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
        this.points++;
        this.clickedCards = [];
      } else {
        this.showingCards = true;
        setTimeout(() => {
          this.clickedCards[0].show = false;
          this.clickedCards[1].show = false;
          this.clickedCards = [];
          this.showingCards = false;
        }, 500);
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
        this.points = 0;
        this.cards.forEach(card=>card.show = false);
        this.clickedCards = [];
        this.showingCards = false;
        this.cards = this.shuffle(this.cards);
        this.$forceUpdate(); // little hack - parent component is not updating when items in cards array are chaning places..
      }
    },

  }
});

