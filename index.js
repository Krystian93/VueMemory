Vue.component("card", {
  props: {
    id:Number,
    color: String,
    show: Boolean
  },


  methods:{
    clickCard(){
      this.$emit('show-card',this);
    },
  },


  template: ` 
    <div @click='clickCard'  class="card" :style="{backgroundColor: this.show ? this.color : 'silver'}">
    </div>
  `
});

const app = new Vue({
  el: "#board",

  name:'board',

  data: {
    cards: [
      { id:1,
        color: "#9E2B25",
        show: false
      },
      { id:2,
        color: "#9E2B25",
        show: false
      },
      { id:3,
        color: "#51355A",
        show: false
      },
      { id:4,
        color: "#51355A",
        show: false
      },
      { id:5,
        color: "#43AA8B",
        show: false
      },
      { id:6,
        color: "#43AA8B",
        show: false
      },
      { id:7,
        color: "#B2B09B",
        show: false
      },
      { id:8,
        color: "#B2B09B",
        show: false
      }
    ]
  },

  methods: {
    showCard(that) {
       this.cards.find(card=>{
         if(card.id===that.id){
           card.show=true;
         }
       });
       
    },
  },
});
