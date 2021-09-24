<template>
  <div id="container">
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"/>
    <!--<button v-on:click="addNode">Add 1 Node</button>-->
  </div>
  
</template>

<script>
import D3Network from 'vue-d3-network'
//import * as forceSimulation from 'd3-force'
//const d3 = Object.assign({}, forceSimulation)

export default {
  components: {
    D3Network
  },
  data () {
    return {
      nodes: [
        { id: 1, name: 'Mobius Server' , _cssClass: 'node pinned', pinned: true, fx: window.innerWidth / 2, fy: window.innerHeight / 2},
      ],
      links: [],
      rawCnt: [],
      //processedCnt: [],
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5,
      }
    }
  },
  created () {
    let vm = this

    this.$http.get('/api/mob_cnt')
        .then((response) => {
          console.log(typeof response.data)
          console.log(response.data)
          response.data.forEach(function(obj) {
            console.log(obj.ri)
            vm.rawCnt.push(obj.ri)
            vm.addNode(1, obj.ri)
          });
        });
    console.log('right here');
    //this.formatCnt(this.rawCnt);
    console.log(this.nodes)
    console.log('done')
  },
  computed: {  //if everything goes to 0, 0 remove custom forces from d3-network in template part
  //if you need it, put it back as :customForces="customForces" or something similar
    customForces() {
      return {
      X: -500,
      Y: -500,
      ManyBody: true
      }
    }
  },
  methods: {
    addLink(id_to_link, curr_id) {
      let vm = this 

      vm.links.push({sid: id_to_link, tid: curr_id}) //sid = source id / tid = target id 
    },
    addNode(id_to_link, name) { //id_to_link is id to link to, name is name of node  // change id_to_link to tid?
      let vm = this

      var highest_id = this.nodes.at(-1)["id"]
      highest_id = highest_id + 1
      vm.nodes.push({id: highest_id, name: name})
      vm.addLink(id_to_link, highest_id)
    },
    formatCnt(raw) {
      let vm = this;

      console.log('hi');
      let arr_len = raw.length;
      console.log(arr_len);
      console.log(typeof raw)
      console.log(raw)
      console.log(Object.values(raw));
      for (var i = 0; i < arr_len; i++) {
        console.log(i);
        console.log(raw[i]);
      }
      raw.forEach(function(ri_obj) {
        console.log('inside');
        console.log(ri_obj);
        console.log(ri_obj.ri);
        vm.addNode(1, ri_obj.ri); //1 is mobius server node, name is name of cnt
      });
      console.log(vm.nodes);
    }
  }
}
</script>


<style src="vue-d3-network/dist/vue-d3-network.css">
#container{
    display: flex;
    width: 100%;
    height: 100%;
}
</style>

